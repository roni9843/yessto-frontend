import { Box } from "@mui/material";
import { whiteColor_v_2 } from "../../../color";
import ProductsPageReduxWrapped from "./ProductsPageReduxWrapped";

export default function WishlistPage() {
  return (
    <div>
      <Box
        component="main"
        sx={{
          backgroundColor: whiteColor_v_2,
          padding: { xs: "0", lg: "20px 50px" }, // No padding on small screens, padding on large screens
          //   backgroundColor: "white",
        }}
      >
        <ProductsPageReduxWrapped></ProductsPageReduxWrapped>
      </Box>
    </div>
  );
}
