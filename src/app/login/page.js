"use client";

import { Provider } from "react-redux";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// import { useDispatch } from "react-redux";
// import { setUserEmail, setUserInfo } from "../redux/userSlice";

import { whiteColor_v_2 } from "../../../color";
import Footer from "../components/Footer/Footer";
import CustomerHeader from "../components/HomePageHeader/CustomerHeader";
import { store } from "../redux/store";
import PageState from "./PageState";
//import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import InfoBar from "../components/InfoBar/InfoBar";

export default function page() {
  const router = useRouter();

  useEffect(() => {
    // Scroll to the top when the page loads
    window.scrollTo(0, 0);
  }, [router.pathname]); // Triggers whenever the page route changes

  // const router = useRouter();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const handleSubmit = async (e) => {
  //   // e.preventDefault();

  //   try {
  //     const { data } = await axios.post(
  //       "https://elec-ecommerce-back.vercel.app/login",
  //       {
  //         email,
  //         password,
  //       }
  //     );
  //     const { token } = data;

  //     // Store JWT token in localStorage
  //     localStorage.setItem("token", token);
  //     document.cookie = `token=${token}`;

  //     // Decode token to get user info
  //     const userInfo = await jwtDecode(token);

  //     dispatch(setUserInfo(userInfo));
  //     dispatch(setUserEmail(email));

  //     // Redirect to the intended page or default to home
  //     const callbackUrl =
  //       new URLSearchParams(window.location.search).get("callbackUrl") || "/";
  //     router.push(callbackUrl);
  //   } catch (error) {
  //     console.error("Error logging in:", error);
  //   }
  // };

  return (
    <div>
      <Provider store={store}>
        <body style={{ backgroundColor: whiteColor_v_2 }}>
          <Box
            component="main"
            sx={{
              backgroundColor: whiteColor_v_2,
              padding: { xs: "0", lg: "5px 50px" }, // No padding on small screens, padding on large screens
              backgroundColor: "black",
            }}
          >
            <InfoBar />
          </Box>
          <Box
            component="main"
            sx={{
              backgroundColor: whiteColor_v_2,
              padding: { xs: "0", lg: "0 50px" }, // No padding on small screens, padding on large screens
              backgroundColor: "white",
          position: "sticky", // Makes the header sticky
          top: 0, // Sticks to the top
          zIndex: 1000, // Ensures the header stays on top
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Adds shadow for 3D effect
          top: 0, // Sticks to the top
          zIndex: 1000, // Ensures the header stays on top
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Adds shadow for 3D effect
              top: 0, // Sticks to the top
              zIndex: 1000, // Ensures the header stays on top
            }}
          >
            <CustomerHeader></CustomerHeader>
          </Box>

          <PageState></PageState>
          <Footer></Footer>
        </body>
      </Provider>
    </div>
  );
}
//       <HomePageHeader></HomePageHeader>
/**
 *    <div
        style={{
          backgroundColor: "#f0f8ea",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <main
          style={{
            maxWidth: "400px",
            width: "100%",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: "30px",
              color: "#2c3e50",
            }}
          >
            Logo
          </h1>
          <h2
            style={{
              textAlign: "center",
              marginBottom: "30px",
              color: "#2c3e50",
            }}
          >
            Log In
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                id="email"
                className="form-control"
                style={{
                  backgroundColor: "#f5f5f5",
                  borderColor: "#ccc",
                  color: "#333",
                  borderRadius: "5px",
                  padding: "10px",
                  marginBottom: "20px",
                  width: "100%",
                }}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                id="password"
                className="form-control"
                style={{
                  backgroundColor: "#f5f5f5",
                  borderColor: "#ccc",
                  color: "#333",
                  borderRadius: "5px",
                  padding: "10px",
                  marginBottom: "20px",
                  width: "100%",
                }}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-success btn-block"
              style={{
                backgroundColor: "#27ae60",
                borderColor: "#27ae60",
                color: "#fff",
                borderRadius: "5px",
                padding: "10px",
              }}
            >
              Login
            </button>
          </form>
          <p style={{ marginTop: "20px", textAlign: "center" }}>
            If you do not have an account,{" "}
            <Link href="/signup">click here</Link>.
          </p>
        </main>
      </div>
 */
