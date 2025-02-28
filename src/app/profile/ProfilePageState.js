"use client";

import { useState } from "react";
import EditProfile from "./EditProfile";
import ProfilePage from "./ProfilePage";

export default function ProfilePageState() {
  const [pageState, setPageState] = useState("Profile");

  return (
    <div>
      {pageState === "Profile" ? (
        <ProfilePage setPageState={setPageState}></ProfilePage>
      ) : (
        <EditProfile setPageState={setPageState}></EditProfile>
      )}
    </div>
  );
}
