"use client";

import CircularProgress from "@mui/material/CircularProgress"; // Import loading spinner from MUI
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  grayColor,
  whiteColor,
  whiteColor_v_2,
  whiteColor_v_3,
} from "../../../color";
import { setUserInfo, setUserPhone } from "../redux/userSlice";

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // For loading state

  const handleSubmit = async (e) => {
    // console.log("click -> ", username, phoneNumber, password);

    e.preventDefault();
    setError(""); // Reset error message
    setLoading(true); // Show loading spinner
    try {
      const { data } = await axios.post("https://backend.yeesto.com/signup", {
        username,
        phoneNumber,
        password,
      });

      // console.log(username, phoneNumber, password);

      const { token } = data;

      // Store JWT token in localStorage
      localStorage.setItem("token", token);

      document.cookie = `token=${token}`;

      // Fetch user info
      const fetchUserInfo = async (userId) => {
        const response = await fetch(
          "https://backend.yeesto.com/getTheUser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: userId }),
          }
        );

        // console.log("this is res -> ", response);

        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const fetchUser = await response.json();

        if (fetchUser) {
          dispatch(setUserInfo(fetchUser.user));
          dispatch(setUserPhone(fetchUser.user.phone));

          // Redirect to the intended page or default to home
          const callbackUrl =
            new URLSearchParams(window.location.search).get("callbackUrl") ||
            "/";
          router.push(callbackUrl);
        }
      };

      fetchUserInfo(token.id);
    } catch (error) {
      // Handle error and display error message
      if (error.response && error.response.data.message) {
        setError(error.response.data.message); // Display backend error message
      } else {
        setError("Error signing up. Please try again.");
      }
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div
      style={{
        backgroundColor: whiteColor_v_2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <main
        style={{
          maxWidth: "400px",
          width: "100%",
          padding: "40px 20px",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        <span
          style={{
            marginBottom: "10px",
            fontSize: "32px",
            fontWeight: "normal",
          }}
        >
          WELCOME
        </span>
        <p style={{ marginBottom: "30px", fontSize: "14px", color: "#777" }}>
          Faster sign-up, quicker access!
        </p>
        {error && <p style={{ color: "red", marginBottom: "20px" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              id="username"
              className="form-control"
              style={{
                backgroundColor: whiteColor,
                borderColor: whiteColor_v_3,
                color: grayColor,
                borderRadius: "5px",
                padding: "10px",
                width: "100%",
                border: `1px solid ${whiteColor_v_3}`,
              }}
              placeholder="name..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              id="phoneNumber"
              className="form-control"
              style={{
                backgroundColor: whiteColor,
                borderColor: whiteColor_v_3,
                color: grayColor,
                borderRadius: "5px",
                padding: "10px",
                width: "100%",
                border: `1px solid ${whiteColor_v_3}`,
              }}
              placeholder="phone number..."
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              id="password"
              className="form-control"
              style={{
                backgroundColor: whiteColor,
                borderColor: whiteColor_v_3,
                color: grayColor,
                borderRadius: "5px",
                padding: "10px",
                width: "100%",
                border: `1px solid ${whiteColor_v_3}`,
              }}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="btn btn-success btn-block button-opacity"
            type="submit"
            disabled={loading} // Disable button when loading
            style={{
              backgroundColor: "#000",
              borderColor: "#000",
              color: "#fff",
              borderRadius: "5px",
              padding: "10px",
              width: "100%",
            }}
          >
            {loading ? (
              <CircularProgress size={24} style={{ color: "#fff" }} /> // Show loading spinner
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <p style={{ marginTop: "20px" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#333", fontWeight: "bold" }}>
            Log In
          </Link>
        </p>
      </main>
    </div>
  );
}
