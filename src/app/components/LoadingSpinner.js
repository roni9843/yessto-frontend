// src/app/components/LoadingSpinner.js
import CircularProgress from "@mui/material/CircularProgress"; // Example using MUI

const LoadingSpinner = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default LoadingSpinner;
