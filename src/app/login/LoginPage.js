"use client";

import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  grayColor,
  whiteColor,
  whiteColor_v_2,
  whiteColor_v_3,
} from "../../../color";
import { setUserInfo } from "../redux/userSlice";
import "./LoginPage.css";

export default function LoginPage({ setAuthState }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // To store error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner
    setErrorMessage(""); // Reset any previous error message

    try {
      const { data } = await axios.post("https://backend.yeesto.com/login", {
        phoneNumber: phone,
        password,
      });
      const { token } = data;

      // Store JWT token in localStorage
      localStorage.setItem("token", token);
      document.cookie = `token=${token}`;

      // Decode token to get user info
      const userInfo = await jwtDecode(token);

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

        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const fetchUser = await response.json();

        if (fetchUser) {
          dispatch(setUserInfo(fetchUser.user));

          // Redirect to the intended page or default to home
          const callbackUrl =
            new URLSearchParams(window.location.search).get("callbackUrl") ||
            "/";

          router.push(callbackUrl);
        }
      };

      fetchUserInfo(userInfo.id);
    } catch (error) {
      // Check if error response from backend contains specific error message
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error); // Set the error message
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
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
          WELCOME <span style={{ fontWeight: "bold" }}>BACK </span>
        </span>
        <p style={{ marginBottom: "30px", fontSize: "14px", color: grayColor }}>
          Faster login, instant access!
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="number"
              id="number"
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
              placeholder="Phone..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
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
              required
            />
          </div>
          {/* Error message display */}
          {errorMessage && (
            <div style={{ color: "red", marginBottom: "20px" }}>
              {errorMessage}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-success btn-block button-opacity"
            style={{
              backgroundColor: loading ? "gray" : "green",
              borderColor: "green",
            }}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <div className="spinner-border text-light" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <p style={{ marginTop: "20px" }}>
          Don’t have an account?{" "}
          <span
            onClick={() => setAuthState("Signup")}
            style={{ color: "#333", fontWeight: "bold", cursor: "pointer" }}
          >
            Sign Up
          </span>
        </p>
      </main>
    </div>
  );
}
