 "use client";


 import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CircularProgress from "@mui/material/CircularProgress"; // Importing spinner
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  blackColor,
  grayColor,
  whiteColor,
  whiteColor_v_2,
  whiteColor_v_3,
} from "../../../color";

import {
  addShippingCostAndDiscountAndCouponCode,
  clearCouponHistory,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  clearDirectOrderProduct,
  toggleSelectCartItems,
} from "../redux/userSlice";
import { Box, Table } from "@mui/material";
//import { Button } from "bootstrap/dist/js/bootstrap.bundle.min";
import Coupon from "./Coupon";
import Shipping from "./Shipping";




export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.users.cart);
  const userInfo = useSelector((state) => state.users.userInfo);
  const AllProduct = useSelector((state) => state.users.AllProduct);
  const discountRateRedux = useSelector((state) => state.users.discountRate);
  const [isHovered, setIsHovered] = useState(false);
  const [discountRate, setDiscountRate] = useState(discountRateRedux);
  const shippingCostRedux = useSelector((state) => state.users.shippingCost);
  const [shippingCost, setShippingCost] = useState({
    value: shippingCostRedux.value,
    state :  shippingCostRedux.state
  });
  const [couponCode,setCouponCode] = useState(null)

  const [loading, setLoading] = useState(false); // Loading state




  // ? selected product 
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSelectProduct = (id) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((productId) => productId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const calculateSelectedTotalPrice = () => {
    return cart
      .filter((item) => selectedProducts.includes(item._id))
      .reduce((total, item) => {
        return total + (item.productOffer
          ? (item.productRegularPrice * (1 - item.productOffer / 100)) * item.quantity
          : item.productRegularPrice * item.quantity);
      }, 0)
      .toFixed(2);
  };


  useEffect(() => {
    const total = calculateSelectedTotalPrice();
    setTotalPrice(total);
  }, [selectedProducts, cart]); // Add selectedProducts to the dependency array



  useEffect(() => {
    // setSelectedProducts(cart.filter(item => item.isSelected).map(item => item._id));
  }, [cart]);

  useEffect(() => {
    setTimeout(() => {
      const cartIds = cart.map(item => item._id);
      setSelectedProducts(cartIds);
    }, 1000);
  }, []);




  const handleIncrease = (id) => {
    // Dispatch the action to increase quantity in Redux store
    dispatch(increaseQuantity(id));
  
    // Retrieve the current cart from localStorage
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
    // Find the product by id and increase its quantity
    cartItems = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
  
    // Save the updated cart to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  
  const handleDecrease = (id) => {
    // Dispatch the action to decrease quantity in Redux store
    dispatch(decreaseQuantity(id));
  
    // Retrieve the current cart from localStorage
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  
    // Find the product by id and decrease its quantity, but ensure it stays above 1
    cartItems = cartItems.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  
    // Save the updated cart to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  const handleRemove = (id) => {
    // Dispatch the action to remove the item from the cart in Redux store
    dispatch(removeFromCart(id));

    // Retrieve the current cart from localStorage
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Remove the item by filtering out the one with the matching id
    cartItems = cartItems.filter((item) => item._id !== id);

    // Save the updated cart to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const handleOrder = () => {
    setLoading(true); // Set loading to true when order is initiated

    dispatch(clearDirectOrderProduct())

    const payload = {shippingCost,couponCode,discountRate};


     

     dispatch(addShippingCostAndDiscountAndCouponCode(payload));
     dispatch(toggleSelectCartItems(selectedProducts))


    if (!userInfo) {
      router.push("/login?callbackUrl=/checkout");
    } else {
      router.push("/checkout");
    }

    setLoading(false); // Reset loading state after routing
  };

  // useEffect(() => {
  //   const getFullProductOnCart = cart.filter((c_p) => {
  //     // console.log("this is cart info -> ", c_p);
  //   });
  // }, [cart]);

  // return 0;


  const [totalPrice,setTotalPrice] = useState(0)


  


  useEffect(()=>{

    // setTotalPrice(cart
    //   .reduce(
    //     (total, item) =>
    //       total +
    //       (item.productOffer
    //         ? (
    //           item.productRegularPrice.toFixed(2) *
    //           (1 - item.productOffer / 100)
    //         ).toFixed(2)
    //         : item.productRegularPrice.toFixed(2)) *
    //       item.quantity,
    //     0
    //   )
    //   .toFixed(2))


  },[cart])



  return (
    <Box
      // style={{
      //   padding: "10px 5px",

      //   // maxWidth: "800px",

      //   margin: "0 auto",
      // }}

      sx={{
        backgroundColor: whiteColor_v_2,
        padding: { xs: "0", lg: "5px 50px" }, // No padding on small screens, padding on large screens
        //  backgroundColor: "black",
      }}
    >
    {cart.length === 0 ? (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <ShoppingCartOutlinedIcon
          style={{
            fontSize: "100px",
            color: "#ccc", // You can adjust the color as needed
          }}
        />
        <p style={{ fontSize: "18px", color: "#666" }}>Your cart is empty.</p>
      </div>
    ) : (
      <div>
        <div className="row px-0 mx-0 mt-3">
          <div
            className="mb-3 "
            style={{ textAlign: "center", fontSize: "24px" }}
          >
            <span>My </span>
            <span style={{ fontWeight: "bold" }}>Card list</span>
          </div>

       <div className="col-12 col-md-6 col-lg-6">
              <Box
              sx={{
                display: { xs: "flex", lg: "none" }, // Hide on extra small and small screens, show on large and above
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Header with Select All checkbox and Product Details label */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "2px solid #ccc", // Under border
              }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    // Select all products
                    setSelectedProducts(cart.map(item => item._id));
                  } else {
                    // Deselect all products
                    setSelectedProducts([]);
                  }
                }}
                checked={selectedProducts.length === cart.length}
                style={{ marginRight: "5px" }} // Add some margin for spacing
              />
              
              <span 
                style={{ fontWeight: "bold", cursor: "pointer" }} 
                onClick={() => {
                  if (selectedProducts.length === cart.length) {
                    // If all products are selected, deselect all
                    setSelectedProducts([]);
                  } else {
                    // Select all products
                    setSelectedProducts(cart.map(item => item._id));
                  }
                }}
              >
                Select All
              </span>
                </div>
                <span style={{ fontWeight: "bold", flex: 1, textAlign: "center" }}>Product Details</span>
              </div>
            
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {cart.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      onChange={() => handleSelectProduct(item._id)}
                      checked={selectedProducts.includes(item._id)}
                      style={{ marginRight: "10px" }} // Add some margin for spacing
                    />
                    <Image
                      onClick={() => router.push(`/product/${item._id}`)}
                      unoptimized
                      src={item.images[0]}
                      alt={item.productName}
                      height={80} // Smaller image height
                      width={80}  // Smaller image width
                      style={{
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginRight: "20px",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div className="align-self-start">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span onClick={() => router.push(`/product/${item._id}`)} style={{ fontSize: "14px" }}>
                            {item.productName}
                          </span>
                          <button
                            onClick={() => handleRemove(item._id)}
                            style={{
                              cursor: "pointer",
                              color: blackColor,
                              border: "none",
                              fontWeight: "bold",
                            }}
                          >
                            <CloseTwoToneIcon />
                          </button>
                        </div>
                        <div>
                          <span
                            style={{
                              fontSize: "11px",
                              color: grayColor,
                            }}
                          >
                            {item.category.category}
                          </span>
                        </div>
                      </div>
                      <div
                        className="align-self-end"
                        style={{
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          className="d-flex d-flex align-items-end"
                          style={{ justifyContent: "space-between" }}
                        >
                          <div>
                            <span
                              style={{
                                margin: "0 0 10px 0",
                                fontWeight: "bold",
                              }}
                            >
                              ৳
                              {item.productOffer
                                ? (
                                  item.productRegularPrice.toFixed(2) *
                                  (1 - item.productOffer / 100)
                                ).toFixed(2)
                                : item.productRegularPrice.toFixed(2)}
                            </span>
                          </div>
                          <div
                            style={{
                              display : "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <button
                              onClick={() => handleDecrease(item._id)}
                              style={{
                                padding: "5px 10px",
                                cursor: "pointer",
                                background: "#ddd",
                                border: "none",
                                borderRadius: "5px",
                                fontWeight: "bold",
                              }}
                            >
                              -
                            </button>
                            <span
                              style={{ fontSize: "16px", fontWeight: "bold" }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleIncrease(item._id)}
                              style={{
                                padding: "5px 10px",
                                cursor: "pointer",
                                background: "#ddd",
                                border: "none",
                                borderRadius: "5px",
                                fontWeight: "bold",
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Box>

            <Box
              sx={{
                display: { xs: "none", lg: "flex" }, // Hide on extra small and small screens, show on large and above
                flexDirection: "column",
                gap: "20px",
              }}
            >


            <table
            style={{
              backgroundColor: "transparent",
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
          <thead>
          <tr>
            <th scope="col" style={{ borderBottom: "2px solid gray", textAlign: "center", padding: "10px" }}>
              <input
                type="checkbox"
                style={{height:"15px", width:"15px"}}
                onChange={(e) => {
                  if (e.target.checked) {
                    // Select all products
                    setSelectedProducts(cart.map(item => item._id));
                  } else {
                    // Deselect all products
                    setSelectedProducts([]);
                  }
                }}
                checked={selectedProducts.length === cart.length}
              />
            </th>
            <th scope="col" style={{ borderBottom: "2px solid gray", textAlign: "left" }}>
              PRODUCT DETAILS
            </th>
            <th scope="col" style={{ borderBottom: "2px solid gray", textAlign: "center" }}>
              QUANTITY
            </th>
            <th scope="col" style={{ borderBottom: "2px solid gray", textAlign: "center" }}>
              SUBTOTAL
            </th>
          </tr>
        </thead>
            <tbody >
              {cart.map((item) => (
                <tr  key={item._id} style={{ textAlign: "center", marginTop:"10px" }}>
                  {/* Checkbox */}
                  <td style={{ padding: "10px" }}>
                  <input
                  style={{height:"15px", width:"15px"}}
                  type="checkbox"
                  onChange={() => handleSelectProduct(item._id)}
                  checked={selectedProducts.includes(item._id)}
                />
                  </td>
          
                 {/* Product Details */}
                    <td
                    className="mt-2"
                    style={{
                      display: "flex",
                      alignItems: "flex-start", // Align items to the start
                      gap: "10px",
                    }}
                    >
                    {/* Image */}
                    <Image
                      onClick={() => router.push(`/product/${item._id}`)}
                      src={item.images[0]}
                      alt={item.productName}
                      height={60}
                      width={60}
                      style={{
                        objectFit: "cover",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    />

                    {/* Name and Price */}
                    <div style={{ textAlign: "left" }}>
                      <span
                        onClick={() => router.push(`/product/${item._id}`)}
                        style={{
                          fontSize: "14px",
                          fontWeight: "bold",
                          cursor: "pointer",
                          display: "block",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          maxWidth: "300px", // Adjust width as needed
                        }}
                      >
                        {item.productName.length > 100
                          ? `${item.productName.slice(0, 100)}...`
                          : item.productName}
                      </span>
                      <span style={{ fontWeight: "bold", color: "gray", textAlign: "left" }}>
                        ৳
                        {item.productOffer
                          ? (
                              item.productRegularPrice * (1 - item.productOffer / 100)
                            ).toFixed(2)
                          : item.productRegularPrice.toFixed(2)}
                      </span>
                    </div>
                    </td>


          
                  {/* Quantity Section */}
                  <td style={{ padding: "10px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      <button
                        onClick={() => handleDecrease(item._id)}
                        style={{
                          padding: "5px 10px",
                          cursor: "pointer",
                          background: "#ddd",
                          border: "none",
                          borderRadius: "5px",
                          fontWeight: "bold",
                        }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrease(item._id)}
                        style={{
                          padding: "5px 10px",
                          cursor: "pointer",
                          background: "#ddd",
                          border: "none",
                          borderRadius: "5px",
                          fontWeight: "bold",
                        }}
                      >
                        +
                      </button>
                    </div>
                  </td>
          
                  {/* Subtotal and Remove */}
                  <td style={{ padding: "10px", textAlign: "right" }}>
                  
                  <button
                  onClick={() => handleRemove(item._id)}
                  style={{
                    cursor: "pointer",
                    color: "red",
                    border: "none",
                    background: "transparent",
                    fontSize: "16px",
                    fontWeight: "bold",
                  }}
                >
                  ✕
                </button>
                  
                  {/* Subtotal */}
                    <span style={{ fontWeight: "bold", display: "block", marginBottom: "10px" }}>
                      ৳
                      {(
                        (item.productOffer
                          ? item.productRegularPrice * (1 - item.productOffer / 100)
                          : item.productRegularPrice) * item.quantity
                      ).toFixed(2)}
                    </span>
                    {/* Remove Button */}
                 
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          

            </Box>
          </div>

          <div className="col-12 col-md-6 col-lg-6">
            <table style={{ backgroundColor: "transparent", width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th
                    scope="col"
                    style={{
                      borderBottom: "2px solid gray",
                      padding: "10px",
                      textAlign: "left",
                    //  fontSize: "18px",
                     // fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    

                  CART TOTALS
                  </th>
             
                </tr>
              </thead>
            </table>

         

            {/* Subtotal */}
            <div className="mt-3" style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", padding: "5px 0" }}>
              <span style={{fontWeight: "bold"}}>Subtotal:</span>
              <span style={{ fontWeight: "bold" }}>৳ {totalPrice}</span>
            </div>

            {
              discountRate > 0 &&   <div className="mt-0" style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", padding: "5px 0" }}>
              <span style={{fontWeight: "bold"}}>Coupon Discount:</span>
              <span style={{ fontWeight: "bold" }}>- ৳ {discountRate}</span>
              </div>
            }
          

            <div className="" style={{ height: "1px", width: "100%", backgroundColor: "gray", opacity: "0.5" }}></div>

          
           <Shipping setShippingCost={setShippingCost}></Shipping>


            {/* Total */}
          

            
            <div className="mt-0" style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", padding: "5px 0" }}>
            <span style={{fontWeight: "bold"}}>Total:</span>
            <span style={{ fontWeight: "bold" }}>৳ { ((totalPrice - discountRate) + shippingCost.value).toFixed(2) }</span>
            </div>

          <div className="" style={{ height: "1px", width: "100%", backgroundColor: "gray", opacity: "0.5" }}></div>
          {/* Cash On Delivery */}
          <div className="my-2" style={{ display: "flex", justifyContent: "flex-end", fontSize: "14px", padding: "0px 0" }}>
          <span>Cash On Delivery (COD)</span>
        </div>

            {/* Proceed to Checkout Button */}
            <div>
              <div className="" style={{ 
                
                //display: "flex",
                
                //justifyContent: "flex-end" 
              
              }}>
                <button
                  className="btn button-opacityNormal"
                  onClick={handleOrder}
                  style={{
                    backgroundColor: "black",
                    padding: "10px 15px",
                    borderRadius: "25px",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease, transform 0.1s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width:"100%",
                    opacity: ((totalPrice - discountRate).toFixed(2) <= 0) ? 0.5 : 1,
                    pointerEvents: ((totalPrice - discountRate).toFixed(2) <= 0) ? "none" : "auto"
                  }}
                  disabled={loading || ((totalPrice - discountRate).toFixed(2) <= 0)}
                >
                  {loading ? (
                    <CircularProgress size={20} color="inherit" style={{ marginRight: "10px" }} />
                  ) : (
                    `PROCESS TO CHECKOUT`
                  )}
                </button>
              </div>
            </div>


           

           

            {/* Coupon Input */}
          <Coupon setCouponCodeText={setCouponCode} setDiscountRate={setDiscountRate} setIsHovered={setIsHovered} isHovered={isHovered} 
          ></Coupon>
          </div>



        </div>
      </div>
    )}
    </Box>
  );
}



