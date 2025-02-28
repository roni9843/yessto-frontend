"use client";

import { Box } from "@mui/material";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { whiteColor_v_2 } from "../../../color";
import CustomerHeader from "../components/HomePageHeader/CustomerHeader";
import { store } from "../redux/store";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Sign Up",
//   description: "Sign Up page",
// };

export default function CheckoutLayout({ children }) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body
          className={inter.className}
          style={{ backgroundColor: whiteColor_v_2 }}
        >
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
            }}
          >
            <CustomerHeader></CustomerHeader>
          </Box>

          {children}
        </body>
      </Provider>
    </html>
  );
}
//   <HomePageHeader></HomePageHeader>
/**
 *     <Provider store={store}>
        <body className={inter.className}>
          <HomePageHeader></HomePageHeader>
          {children}
        </body>
      </Provider>
 */
