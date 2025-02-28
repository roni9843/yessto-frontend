import { Box } from "@mui/material";
import { Inter } from "next/font/google";

import { whiteColor_v_2 } from "../../../color";
import Footer from "../components/Footer/Footer";
import HomePageHeaderReduxWrapped from "./HomePageHeaderReduxWrapped";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Sign Up",
//   description: "Sign Up page",
// };

export default function ContactLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ backgroundColor: whiteColor_v_2 }}
      >
        <Box
          component="main"
          sx={{
            backgroundColor: whiteColor_v_2,
            //  padding: { xs: "0", lg: "0 50px" }, // No padding on small screens, padding on large screens
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
          <HomePageHeaderReduxWrapped></HomePageHeaderReduxWrapped>
        </Box>

        {children}

        <Footer></Footer>
      </body>
    </html>
  );
}

//  <HomePageHeader></HomePageHeader>
