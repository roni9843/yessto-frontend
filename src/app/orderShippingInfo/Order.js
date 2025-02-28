"use client";

import CreditScoreIcon from "@mui/icons-material/CreditScore";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import {
  blackColor,
  redColor,
  whiteColor,
  whiteColor_v_3,
} from "../../../color";

// Custom Stepper Connector
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: redColor,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: redColor,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: whiteColor_v_3,
    borderRadius: 1,
  },
}));

// Custom Stepper Icon
const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: ownerState.active ? blackColor : whiteColor_v_3,
  zIndex: 1,
  color: ownerState.active ? whiteColor : blackColor,
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage: "#eee",
    boxShadow: `0 4px 10px 0 ${blackColor}`,
  }),
  ...(ownerState.completed && {
    backgroundImage: "#eee",
  }),
}));

// Icons for Stepper
function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PendingActionsIcon />,
    2: <ViewQuiltIcon />,
    3: <LocalShippingIcon />,
    4: <CreditScoreIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

// Steps for Order Status
const steps = ["Pending", "Processing", "Shipped", "Delivered"];

export default function Order({ orderDetails, userInfo }) {
  const router = useRouter();

  if (!orderDetails) {
    return <div>No order details available</div>;
  }

  // Determine the current step
  const getActiveStep = (status) => {
    switch (status) {
      case "Pending":
        return 0;
      case "Processing":
        return 1;
      case "Shipped":
        return 2;
      case "Delivered":
        return 3;
      default:
        return 0;
    }
  };

  // Truncate product name
  const truncateString = (str, num) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <Card
        sx={{
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
          borderRadius: "10px",
        }}
      >
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Shipping <span style={{ fontWeight: "bold" }}>Information</span>
          </Typography>
          <Typography variant="body1" align="center">
            Order date: {new Date(orderDetails.orderDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" align="center">
            Estimated delivery:{" "}
            {new Date(
              new Date(orderDetails.orderDate).setDate(
                new Date(orderDetails.orderDate).getDate() + 7
              )
            ).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" align="center">
            Order Id:{" "}
            <span style={{ fontWeight: "bold" }}>{orderDetails.orderId}</span>
          </Typography>

          <Typography
            variant="h6"
            align="left"
            sx={{ fontWeight: "bold", marginTop: "20px" }}
          >
            Order Details
          </Typography>
          <Typography>Name: {userInfo.username}</Typography>
          <Typography>Phone: {userInfo.phoneNumber}</Typography>
          <Typography>Address: {orderDetails.address}</Typography>
          {
            orderDetails.orderNotes &&    <Typography>Order Notes: {orderDetails.orderNotes}</Typography>
          }
       
          <hr className="m-1 p-0" />
          <Typography>Shipping Cost: ৳ {orderDetails.shippingCost}</Typography>
          {
            orderDetails.couponAmount !== 0 &&  <Typography>Coupon Discount: ৳ {orderDetails.couponAmount}</Typography>
          }
         
          <Typography sx={{ fontWeight: "bold" }}>
            Payment Method: {orderDetails.paymentMethod}
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>
            Payment Area: {orderDetails.shippingState === "shippingOutsideDhaka" ? "ঢাকার বাহিরে" : "ঢাকার মধ্যে"   }
          </Typography>
          <Typography
            variant="h5"
            align="left"
            sx={{ fontWeight: "bold", marginTop: "20px" }}
          >
            Total: ৳{(orderDetails.totalAmount - orderDetails.couponAmount + orderDetails.shippingCost).toFixed(2)}
          </Typography>
        </CardContent>
      </Card>

      {orderDetails.status === "Cancelled" ? (
        <div style={{ textAlign: "center", color: redColor }}>
          This order was Cancelled
        </div>
      ) : (
        <Stack sx={{ width: "100%" }} spacing={4}>
          <Stepper
            alternativeLabel
            activeStep={getActiveStep(orderDetails.status)}
            connector={<ColorlibConnector />}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconComponent={ColorlibStepIcon}
                  StepIconProps={{ icon: index + 1 }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
      )}

      <Box sx={{ padding: "10px", maxWidth: "1000px", margin: "0 auto" }}>
        <Grid container spacing={3}>
          {orderDetails.products.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                onClick={() => router.push(`/product/${item.product._id}`)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f7f7f7",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  padding: "10px",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.05)" },
                  cursor: "pointer",
                }}
              >
                <Image
                  // unoptimized
                  src={item.product.images[0]}
                  alt={item.product.productName}
                  height={100}
                  width={100}
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginRight: "16px",
                  }}
                />
                <Box sx={{ textAlign: "left", flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: {
                        xs: "12px",
                        sm: "14px",
                        md: "16px",
                      },
                      fontWeight: 500,
                    }}
                  >
                    {truncateString(item.product.productName, 12)}
                  </Typography>

                  {/* Display Quantity */}
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "10px",
                        sm: "12px",
                        md: "14px",
                      },
                      color: "#555",
                    }}
                  >
                    Qty: {item.qty}
                  </Typography>

                  {/* Highlight Discount if Offer Exists */}
                  {item.product.productOffer > 0 && (
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "10px",
                          sm: "12px",
                          md: "14px",
                        },
                        color: redColor,
                      }}
                    >
                      Offer: {item.product.productOffer}% Off
                    </Typography>
                  )}

                  {/* Show Product Price */}
                  <Typography
                    sx={{
                      fontSize: {
                        xs: "12px",
                        sm: "14px",
                        md: "16px",
                      },
                      fontWeight: 600,
                    }}
                  >
                    ৳{item.price.toFixed(2)}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
