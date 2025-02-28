"use client";

import CancelIcon from "@mui/icons-material/Cancel";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined"; // Example icon
import DoneIcon from "@mui/icons-material/Done";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import {
  Box,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NewArrivalsUiSection from "../components/NewArrivalsUiSection/NewArrivalsUiSection";
import Order from "./Order";

export default function OrderPageClient() {
  const userInfo = useSelector((state) => state.users.userInfo);

  const [fetchOrder, setFetchOrder] = useState([]);
  const [completeOrder, setCompleteOrder] = useState([]);
  const [orderCancel, setOrderCancel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageState, setPageState] = useState("Con_order");

  useEffect(() => {
    fetchData();
  }, [userInfo]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://backend.yeesto.com/getTheOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userInfo._id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const completeOrder = data.filter((o) => o.status === "Delivered");
        const orderCancel = data.filter((o) => o.status === "Cancelled");
        const orderPro = data.filter(
          (o) => o.status !== "Cancelled" && o.status !== "Delivered"
        );
        setCompleteOrder(completeOrder);
        setOrderCancel(orderCancel);
        setFetchOrder(orderPro);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderOrderSection = () => {
    switch (pageState) {
      case "Complete_order":
        return completeOrder.length > 0 ? (
          completeOrder.map((or) => (
            <Box key={or._id} sx={{ mb: 2 }}>
              <Order orderDetails={or} userInfo={userInfo} />
            </Box>
          ))
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CancelOutlinedIcon sx={{ fontSize: 100, color: "#ccc" }} />
            <Typography sx={{ mt: 2 }}>No completed orders found.</Typography>
          </Box>
        );
      case "Cancel_order":
        return orderCancel.length > 0 ? (
          orderCancel.map((or) => (
            <Box key={or._id} sx={{ mb: 2 }}>
              <Order orderDetails={or} userInfo={userInfo} />
            </Box>
          ))
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CancelOutlinedIcon sx={{ fontSize: 100, color: "#ccc" }} />
            <Typography sx={{ mt: 2 }}>No cancelled orders found.</Typography>
          </Box>
        );
      case "Con_order":
        return fetchOrder.length > 0 ? (
          fetchOrder.map((or) => (
            <Box key={or._id} sx={{ mb: 2 }}>
              <Order orderDetails={or} userInfo={userInfo} />
            </Box>
          ))
        ) : (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <CancelOutlinedIcon sx={{ fontSize: 100, color: "#ccc" }} />
            <Typography sx={{ mt: 2 }}>No processing orders found.</Typography>
          </Box>
        );
      default:
        return null;
    }
  };
  return (
    <Box
      sx={{
        paddingTop: "10px",
        paddingX: {
          xs: "10px",
          sm: "20px",
          lg: "90px",
          xl: "90px",
        },
        paddingBottom: {
          xs: "10px",
          sm: "20px",
          lg: "90px",
          xl: "90px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 5,
          flexWrap: "wrap",
          mt: { xs: 3, md: 1, sm: 1 },
          mx: { md: 5, sm: 5, xs: 2 },
        }}
      >
        <ToggleButtonGroup
          value={pageState}
          exclusive
          onChange={(event, newPageState) => setPageState(newPageState)}
          aria-label="order status"
          sx={{
            border: "1px solid #ddd",
            borderRadius: 2,
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#f9f9f9",
            "& .MuiToggleButton-root": {
              fontSize: {
                xs: "0.75rem",
                sm: "0.875rem",
                md: "1rem",
              },
              fontWeight: "bold",
              padding: {
                xs: "5px",
                sm: "16px",
                md: "10px",
              },
              transition: "all 0.3s ease-in-out",
              display: "flex",
              alignItems: "center",
              "& .MuiButton-startIcon": {
                fontSize: {
                  xs: "1.5rem",
                  sm: "1.75rem",
                  md: "2rem",
                },
              },
              "& .MuiTypography-root": {
                display: {
                  xs: "none",
                  md: "inline",
                },
              },
              "&.Mui-selected": {
                color: "#fff",
                backgroundColor: "#000",
                "&:hover": {
                  backgroundColor: "#333",
                },
              },
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            },
          }}
        >
          <ToggleButton
            value="Con_order"
            aria-label="processing order"
            sx={{
              color: "#000",
              borderColor: "#000",
              "&.Mui-selected": {
                backgroundColor: "#000",
              },
            }}
          >
            <HourglassEmptyIcon
              sx={{
                mr: { xs: 0, md: 1, sm: 1 },
                mx: { xs: 1, md: 1, sm: 1 },
              }}
            />
            <Typography
              variant="body2"
              sx={{ display: { xs: "none", md: "inline" }, fontSize: 12 }}
            >
              Processing
            </Typography>
          </ToggleButton>
          <ToggleButton
            value="Complete_order"
            aria-label="complete order"
            sx={{
              color: "#000",
              borderColor: "#000",
              "&.Mui-selected": {
                backgroundColor: "#000",
              },
            }}
          >
            <DoneIcon
              sx={{
                mr: { xs: 0, md: 1, sm: 1 },
                mx: { xs: 1, md: 1, sm: 1 },
              }}
            />
            <Typography
              variant="body2"
              sx={{ display: { xs: "none", md: "inline" }, fontSize: 12 }}
            >
              Complete
            </Typography>
          </ToggleButton>
          <ToggleButton
            value="Cancel_order"
            aria-label="cancel order"
            sx={{
              color: "#000",
              borderColor: "#000",
              "&.Mui-selected": {
                backgroundColor: "#000",
              },
            }}
          >
            <CancelIcon
              sx={{
                mr: { xs: 0, md: 1, sm: 1 },
                mx: { xs: 1, md: 1, sm: 1 },
              }}
            />
            <Typography
              variant="body2"
              sx={{ display: { xs: "none", md: "inline" }, fontSize: 12 }}
            >
              Cancel
            </Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          {renderOrderSection()}
          {fetchOrder.length <= 0 && <NewArrivalsUiSection />}
        </Box>
      )}
    </Box>
  );
}
