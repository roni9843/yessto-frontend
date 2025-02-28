"use client";

import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { whiteColor_v_2 } from "../../../color";
import { setUserInfo, setUserPhone } from "../redux/userSlice";

export default function EditProfile({ setPageState }) {
  const userInfo = useSelector((state) => state.users.userInfo);
  const dispatch = useDispatch();
  const [username, setUsername] = useState(userInfo?.username);

  const [phoneNumber, setPhoneNumber] = useState(userInfo?.phoneNumber);

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuStyles, setMenuStyles] = useState({});
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://backend.yeesto.com/updateUser", {
        method: "POST", // Use POST method
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userInfo._id,
          username: username,
          phoneNumber: phoneNumber,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Update was successful
        // console.log("Profile updated successfully", data);

        dispatch(setUserInfo(data));
        dispatch(setUserPhone(data.phone));

        setPageState("Profile");

        // Optionally update the local state or Redux store with the new user info
      } else {
        // Handle different response statuses
        console.error("Failed to update profile", response);
      }
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const profileStyles = {
    container: {
      marginTop: "20px",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      maxWidth: "400px",
      margin: "0 auto",
      backgroundColor: whiteColor_v_2,
    },
    profileImage: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      backgroundColor: "#007bff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "40px",
      color: "#fff",
      margin: "20px auto",
    },
    formGroup: {
      marginBottom: "15px",
    },
    formLabel: {
      display: "block",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    formControl: {
      width: "100%",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #000",
      marginBottom: "5px",
    },
    inputGroup: {
      display: "flex",
      alignItems: "center",
    },
    inputGroupText: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "40px",
      height: "40px",
      cursor: "pointer",
    },
    editIcon: {
      cursor: "pointer",
      color: "#007bff",
    },
    saveButton: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#000",
      borderColor: "#000",
      color: "#fff",
      borderRadius: "5px",
      cursor: "pointer",
    },
    link: {
      display: "block",
      textAlign: "center",
      marginTop: "10px",
      textDecoration: "none",
      color: "#000",
    },
    footer: {
      textAlign: "center",
      marginTop: "30px",
    },
    footerLink: {
      margin: "0 10px",
      color: "#000",
      textDecoration: "none",
    },
  };

  return (
    <div style={profileStyles.container}>
      <div
        className="mx-2 d-flex justify-content-end"
        style={{ position: "relative" }}
      >
        <MoreVertIcon onClick={handleMenuClick} style={{ cursor: "pointer" }} />
        {anchorEl && (
          <div
            ref={menuRef}
            className="dropdown-menu show"
            style={{
              position: "absolute",
              top: 0,
              left: menuStyles.left,
            }}
          >
            <button
              onClick={() => setPageState("Profile")}
              className="dropdown-item"
            >
              Back to Profile
            </button>
          </div>
        )}
      </div>

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>MY ACCOUNT</h2>
      <div style={profileStyles.profileImage}>{username.charAt(0)}</div>
      <form onSubmit={handleSubmit}>
        <div style={profileStyles.formGroup}>
          <label style={profileStyles.formLabel}>Username</label>
          <div style={profileStyles.inputGroup}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={profileStyles.formControl}
            />
            <div style={profileStyles.inputGroupText}>
              <EditIcon style={profileStyles.editIcon} />
            </div>
          </div>
        </div>

        <div style={profileStyles.formGroup}>
          <label style={profileStyles.formLabel}>Phone</label>
          <div style={profileStyles.inputGroup}>
            <input
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={profileStyles.formControl}
            />
            <div style={profileStyles.inputGroupText}>
              <EditIcon style={profileStyles.editIcon} />
            </div>
          </div>
        </div>

        <button type="submit" style={profileStyles.saveButton}>
          save
        </button>
      </form>
    </div>
  );
}
