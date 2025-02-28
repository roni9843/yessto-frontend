import AccessTimeIcon from "@mui/icons-material/AccessTime";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PhoneIcon from "@mui/icons-material/Phone";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Box, Typography } from "@mui/material";

export default function InfoBar() {
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" }, // Hide on small screens, show on larger screens
        flexDirection: { sm: "row" },
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#000",
        color: "#fff",
        //  padding: { sm: "5px 50px" },
        padding: { sm: "0px" },
        fontSize: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <AccessTimeIcon fontSize="small" />
          <Typography variant="body2">08:30 AM - 10:30 PM</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <PhoneIcon fontSize="small" />
          <Typography variant="body2"> 01734-700316</Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <FacebookIcon fontSize="small" />
        <InstagramIcon fontSize="small" />

        <PhoneIcon fontSize="small" />
        <LinkedInIcon fontSize="small" />
        <YouTubeIcon fontSize="small" />
      </Box>
    </Box>
  );
}
