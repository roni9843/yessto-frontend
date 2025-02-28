// import CateAndProductList from "@/app/components/CateAndProductList/CateAndProductList";
import Footer from "@/app/components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.css";
import { whiteColor_v_2 } from "../../../../color";
import HomePageHeaderReduxWrapped from "./HomePageHeaderReduxWrapped";
//import { Inter } from "next/font/google";
// import HomePageHeaderReduxWrapped from "./HomePageHeaderReduxWrapped";
import { Box } from "@mui/material";

//const inter = Inter({ subsets: ["latin"] });

export default function ProductLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: whiteColor_v_2 }}>
        <HomePageHeaderReduxWrapped></HomePageHeaderReduxWrapped>

        <div className="mt-3"></div>

        <Box
          component="main"
          sx={{
            backgroundColor: whiteColor_v_2,
            padding: { xs: "0", lg: "0 50px" }, // No padding on small screens, padding on large screens
            // backgroundColor: "white",
          }}
        >
          {children}
        </Box>

        <div className="mt-3">
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}

//
//  <CateAndProductList></CateAndProductList>
