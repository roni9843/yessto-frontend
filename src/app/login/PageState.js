"use client";

import { useState } from "react";

import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";

export default function PageState() {
  const [authState, setAuthState] = useState("Login");

  return (
    <div>
      {authState === "Login" ? (
        <LoginPage setAuthState={setAuthState}></LoginPage>
      ) : (
        <SignupPage setAuthState={setAuthState}></SignupPage>
      )}
    </div>
  );
}
