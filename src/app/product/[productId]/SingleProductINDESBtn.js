"use client";

import {
  addDirectOrderProduct,
  addToCart,
  clearCart,
  clearCouponHistory,
  decreaseQuantity,
  increaseQuantity,
  clearDirectOrderProduct,
  increaseQuantityFromProductPage,
} from "@/app/redux/userSlice";
import AddShoppingCartTwoToneIcon from "@mui/icons-material/AddShoppingCartTwoTone";
import ShoppingBasketTwoToneIcon from "@mui/icons-material/ShoppingBasketTwoTone";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SingleProductINDESBtn({ productData }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.users.userInfo);
  // Initialize quantity state
  const [quantity, setQuantity] = useState(1);

  // Update localStorage and Redux when quantity changes
  const updateCart = (additionalQuantity = 0) => {
    // Get cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Find the product in the cart
    const existingProductIndex = cartItems.findIndex(
      (item) => item._id === productData._id
    );

    if (existingProductIndex !== -1) {
      // Product exists, increase quantity
      cartItems[existingProductIndex].quantity += additionalQuantity;

      // Dispatch the appropriate action to Redux
      if (additionalQuantity > 0) {
       // dispatch(increaseQuantity(productData._id));
      const payload= {
        id : productData._id,
        qty : quantity,
       }
        dispatch(increaseQuantityFromProductPage(payload));
      } else if (additionalQuantity < 0) {
       // dispatch(decreaseQuantity(productData._id));
      }
    } else {
      // New product, add it with the current quantity
      const newProduct = { ...productData, quantity: quantity };
      cartItems.push(newProduct);

      // Add to Redux as a new product
    dispatch(addToCart(newProduct));


    const payload= {
      id : productData._id,
      qty : quantity - 1,
     }
      dispatch(increaseQuantityFromProductPage(payload));

    }

    // Save updated cart to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  // Handle increasing quantity
  const increaseQuantityHandler = () => {
    setQuantity((prev) => prev + 1);
  //  updateCart(1); // Increase by 1 when clicking "+"
  };

  // Handle decreasing quantity
  const decreaseQuantityHandler = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
  //    updateCart(-1); // Decrease by 1 when clicking "-"
    }
  };

  useEffect(() => {
    // Initialize quantity from localStorage if it exists
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingProduct = cartItems.find((p) => p._id === productData._id);
    // setQuantity(existingProduct ? existingProduct.quantity : 1);
  }, [productData._id]);

  return (
    <div>
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" }, // Stack vertically on small screens
        gap: 2,
        alignItems: { xs: "center", md: "flex-start" },
        padding: { xs: "10px", md: "20px" }, // Padding adjustments for responsiveness
      }}
    >
      {/* Quantity Increase/Decrease buttons */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #ddd",
          borderRadius: "30px",
          backgroundColor: "#f7f7f7",
          width: { xs: "120px", md: "100%" }, // Small width on mobile, larger on desktop
          height: "50px",
          marginBottom: { xs: "15px", md: 0 }, // Add margin in mobile for better spacing
        }}
      >
        <button
          onClick={decreaseQuantityHandler}
          style={{
            flex: 1,
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: quantity > 1 ? "pointer" : "not-allowed",
          }}
          disabled={quantity === 1}
        >
          -
        </button>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "bold",
            borderLeft: "1px solid #ddd",
            borderRight: "1px solid #ddd",
          }}
        >
          {quantity}
        </div>
        <button
          onClick={increaseQuantityHandler}
          style={{
            flex: 1,
            background: "none",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          +
        </button>
      </Box>
  
      {/* Add to Cart button */}
      <button
        className="btn button-opacityNormal"
        onClick={() => {
          updateCart(1); // Increase quantity by 1 when clicking Add to Cart
        }}
        style={{
          backgroundColor: "black",
          color: "white",
          border: "none",
          padding: "12px 25px",
          fontSize: 16,
          borderRadius: "30px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          width: "100%", // Ensure full width on mobile
          justifyContent: "center", // Center content in mobile
          marginBottom: { xs: "10px", md: 0 }, // Adjust margin for mobile
        }}
      >
        <AddShoppingCartTwoToneIcon style={{ color: "white", marginRight: 8 }} />
        Add to Cart
      </button>
  
      {/* Buy Now button */}
      <button
        className="btn"
        onClick={() => {


       
        //  updateCart(0); // Use current quantity without incrementing
  

          // Dispatch action to add product data and quantity to Redux store

        dispatch(clearDirectOrderProduct())

          dispatch(addDirectOrderProduct({
            ...productData,
            quantity: quantity
          }));

      //    Existing routing logic
          if (!userInfo) {
            router.push("/login?callbackUrl=/checkout");
          } else {
            router.push("/checkout");
          }

          // ? old route 
          router.push("/productCart");
  
           // ? new route 
           if (!userInfo) {
            router.push("/login?callbackUrl=/checkout");
          } else {
            router.push("/checkout");
          }
        }}
        style={{
          border: "2px solid black",
          color: "black",
          padding: "12px 25px",
          fontWeight: "bold",
          fontSize: 16,
          borderRadius: "30px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          width: "100%", // Full width for better mobile experience
          justifyContent: "center", // Center content
        }}
      >
        <ShoppingBasketTwoToneIcon style={{ color: "black", marginRight: 8 }} />
        Buy Now
      </button>
    </Box>
  </div>
  
  
  );
}
