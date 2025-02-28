"use client";

import EmailIcon from "@mui/icons-material/Email";
import MessageIcon from "@mui/icons-material/Message";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import SendIcon from "@mui/icons-material/Send";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, phone, message } = formData;

    if (!name || !phone || !message) {
      setError("Name, Phone, and Message are required fields.");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true); // Show loading spinner

    try {
      const response = await fetch("https://backend.yeesto.com/postEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Clear form fields on success
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
        setSuccess("Message sent successfully!"); // Set success message
      } else {
        setError("Failed to send the message. Please try again.");
      }
    } catch (error) {
      setError("Error occurred while sending the message.");
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        margin: "50px auto", // Adds margin to the top
        padding: "20px",
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ mb: 4, fontWeight: "bold" }}
      >
        Contact Us
      </Typography>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Success Alert */}
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {success}
        </Alert>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" alignItems="flex-end">
            <PersonIcon sx={{ color: "action.active", mr: 1 }} />
            <TextField
              fullWidth
              label="Name"
              name="name"
              variant="standard"
              value={formData.name}
              onChange={handleChange}
              required
              error={!formData.name && Boolean(error)}
              helperText={!formData.name && error ? "Name is required" : ""}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="flex-end">
            <EmailIcon sx={{ color: "action.active", mr: 1 }} />
            <TextField
              fullWidth
              label="Email (Optional)"
              name="email"
              type="email"
              variant="standard"
              value={formData.email}
              onChange={handleChange}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="flex-end">
            <PhoneIcon sx={{ color: "action.active", mr: 1 }} />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              variant="standard"
              value={formData.phone}
              onChange={handleChange}
              required
              error={!formData.phone && Boolean(error)}
              helperText={!formData.phone && error ? "Phone is required" : ""}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="flex-end">
            <MessageIcon sx={{ color: "action.active", mr: 1 }} />
            <TextField
              fullWidth
              label="Message"
              name="message"
              multiline
              rows={4}
              variant="standard"
              value={formData.message}
              onChange={handleChange}
              required
              error={!formData.message && Boolean(error)}
              helperText={
                !formData.message && error ? "Message is required" : ""
              }
            />
          </Box>
        </Grid>

        <Grid item xs={12} textAlign="center">
          <Button
            type="submit"
            variant="contained"
            endIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
            disabled={loading}
            sx={{
              mt: 2,
              backgroundColor: "black",
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
