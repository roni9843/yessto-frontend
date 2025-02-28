"use client";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { whiteColor_v_2 } from "../../../color";
import Shipping from "../productCart/Shipping";
import Coupon from "../productCart/Coupon";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, clearCouponHistory, removeFromCart,clearDirectOrderProduct } from "../redux/userSlice";
import { useRouter } from "next/navigation";
import checkGif from "../../../public/check.gif";
import Image from "next/image";

export default function Checkout() {
  const [shippingMethod, setShippingMethod] = useState("insideDhaka");
  const router = useRouter();

  const dispatch = useDispatch();

  const [orderNotes, setOrderNotes] = useState("");
  const [couponCode, setCouponCode] = useState(null);
  const isDirectOrder = useSelector((state) => state.users.isDirectOrder);


  // const cart = useSelector((state) => state.users.isDirectOrder ? [...state.users.directOrderProductData] : state.users.cart);

  const cart = useSelector((state) => state.users.isDirectOrder ? [...state.users.directOrderProductData] : state.users.cart.filter(item => item.isSelect === true));



  const [productCart,setProductCart] = useState(cart)


  const userInfo = useSelector((state) => state.users.userInfo);
  const discountRateRedux = useSelector((state) => state.users.discountRate);
  const shippingCostRedux = useSelector((state) => state.users.shippingCost);
  const [shippingCost, setShippingCost] = useState({
    value: shippingCostRedux.value,
    state: shippingCostRedux.state,
  });
  const [isHovered, setIsHovered] = useState(false);
  const [discountRate, setDiscountRate] = useState(discountRateRedux);
  const [isPushBack, setIsPushBack] = useState(true);



  // New state for form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [thanaDistrict, setThanaDistrict] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);
  const [isOrderDone, setIsOrderDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const couponCodeRedux = useSelector((state) => state.users.couponCode);

      useEffect(()=>{
       setCouponCode(couponCodeRedux)
      },[userInfo])
  useEffect(()=>{

// userInfo === null ? "" : userInfo.username
setName(userInfo === null ? "" : userInfo.username)
setPhone(userInfo === null ? "" : userInfo.phoneNumber)

  },[userInfo])


  // New state for form validation errors
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    address: "",
    thanaDistrict: "",
  });






 

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(
      productCart
        .reduce(
          (total, item) =>
            total +
            (item.productOffer
              ? (
                  item.productRegularPrice.toFixed(2) *
                  (1 - item.productOffer / 100)
                ).toFixed(2)
              : item.productRegularPrice.toFixed(2)) * item.quantity,
          0
        )
        .toFixed(2)
    );
  }, [productCart]);




  useEffect(() => {
    if (isPushBack) {
      if (cart.length === 0) {
        router.push("/");
      }
    }
  }, [cart, router, isPushBack]);



  const removeFromCartFunction = (cartIds) => {
    // Dispatch the action to remove the item from the cart in Redux store
    dispatch(removeFromCart(cartIds));

    // Retrieve the current cart from localStorage
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Remove the items by filtering out the ones with the matching ids
    cartItems = cartItems.filter((item) => !cartIds.includes(item._id));

    // Save the updated cart to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  // Validation function
  const handleOrder = async () => {
    const newErrors = {
      name: name ? "" : "Name is required",
      phone: phone ? "" : "Phone number is required",
      address: address ? "" : "Address is required",
      thanaDistrict: thanaDistrict ? "" : "Thana & District is required",
    };
  
    setErrors(newErrors);
  
    // Check if there are any errors
    if (!newErrors.name && !newErrors.phone && !newErrors.address && !newErrors.thanaDistrict) {
      // All fields are filled, proceed with order
      const orderDetails = {
        userId: userInfo._id,
        products: cart.map((item) => ({
          product: item._id,
          qty: item.quantity,
          price:
            item.productOffer > 0
              ? (
                  item.productRegularPrice.toFixed(2) *
                  (1 - item.productOffer / 100)
                ).toFixed(2)
              : item.productRegularPrice.toFixed(2),
        })),
        address: address,
        totalAmount: totalPrice,
        paymentMethod: "Cash on Delivery",
        shippingCost: shippingCost.value,
        shippingState: shippingCost.state,
        couponCode: couponCode,
        couponAmount: discountRate,
        phoneNumber: phone,
        thanaDistrict: thanaDistrict,
        name: name,
        orderNotes: orderNotes,
      };

      setIsLoading(true); // Start loading
  
      try {
        const response = await fetch("https://backend.yeesto.com/postOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderDetails),
        });
  
        if (response.ok) {
          const data = await response.json();
  
          setOrderStatus("Order placed successfully!");
          setIsOrderDone(true);
  
          // Show success alert
         // alert("Order placed successfully!");
  
          setTimeout(() => {
            // Clear cart from Redux store and localStorage
            // dispatch(clearCart());
            dispatch(clearCouponHistory());
            // localStorage.removeItem("cartItems"); // Clear cart from localStorage


            let ids = cart.map((item) => item._id)

            removeFromCartFunction(ids);

  
            router.push("/orderShippingInfo");
            setIsPushBack(false);
            setIsLoading(false); // Stop loading after redirect
          }, 3000);
        } else {
          setOrderStatus("Failed to place order.");
          setIsLoading(false); // Stop loading on failure
          alert("Failed to place order. Please try again.");
        }
      } catch (error) {
        // Catch network or server errors
        setOrderStatus("An error occurred. Please try again later.");
        setIsLoading(false);
        console.error("Order placement error:", error);
        alert("An error occurred. Please try again later.");
      }
    } else {
      // Show an error if any field is missing
      alert("Please fill all required fields before placing your order.");
      setIsLoading(false); // Start loading
    }
  };
  






   // Updated styles for smaller fonts and mobile layout
   const styles = {
    container: {
  //   display: 'flex',
   //   flexDirection: 'row',
   //   flexWrap: 'wrap',
    //  maxWidth: '1200px',
      margin: '20px auto',
      fontFamily: 'Arial, sans-serif',
    },
    form: {
    //  flex: '2',
      padding: '20px',
      border: '1px solid #ddd',
      marginBottom: '20px',
   //   boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      fontSize: '14px', // Smaller font size for professional look
      backgroundColor:"white"
    },
    orderSummary: {
    //  flex: '1',
      padding: '20px',
      backgroundColor: 'white', // Set background color to white
      border: '1px solid #ddd',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      fontSize: '14px', // Smaller font size for the order summary as well
      border: "2px solid black"
    },
    section: {
      marginTop: '20px',
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      fontWeight: 'bold',
      marginBottom: '5px',
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '10px', // Smaller padding
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px', // Input font size
    },
    orderConfirmation : {
      marginTop: "50px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    orderConfirmationCard : {
      width: "300px",
      borderRadius: "10px",
      overflow: "hidden",
      backgroundColor: "#f8faf6",
      border: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    textarea: {
      width: '100%',
      padding: '10px', // Smaller padding
      height: '80px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
      marginBottom: '20px',
    },
    summaryItem: {
      display: 'flex',
      justifyContent: 'space-between',
    //  marginBottom: '15px',
    //  paddingBottom: '10px',
    //  borderBottom: '1px solid #eee',
    },
    radio: {
      marginBottom: '10px',
    },
    button: {
      backgroundColor: '#000',
      color: '#fff',
      padding: '15px',
      textAlign: 'center',
      border: 'none',
      width: '100%',
      cursor: 'pointer',
      fontSize: '16px',
      marginTop: '20px',
      textTransform: 'uppercase',
      borderRadius: '4px',
    },
    orderItem: {
      display:"flex",
      justifyContent: "space-between",
      borderBottom: '1px solid #ccc',
      paddingBottom: '10px',
      marginBottom: '10px',
    },
    error: {
      color: "red",
      fontSize: "12px",
      marginBottom: "10px",
    },
    // Mobile-first design with specific focus on moving the order section below the form
    '@media (max-width: 768px)': {
      container: {
        flexDirection: 'column',
      },
      orderSummary: {
        marginTop: '20px', // Push the order summary below the form on mobile
      },
    },
  };





  return (


    <div>  
    

    {
      !isOrderDone ?
  


    <Box
      sx={{
        backgroundColor: whiteColor_v_2,
        padding: { xs: "0", lg: "5px 50px" },
      }}
    >

    {userInfo &&  (
      <div className="row m-0 p-0"   >


 

        <div
        className="mb-3 mt-3"
        style={{ textAlign: "center", fontSize: "24px" }}
      >
        <span>My </span>
        <span style={{ fontWeight: "bold" }}>CHECKOUT DETAILS</span>
      </div>
      {/* Left Side: Billing & Shipping Form */}
      <div className="col-12 col-md-6 px-2"   >
        <div className="m-2" style={styles.form}>
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              borderBottom: "2px solid gray",
              marginBottom: "20px",
              paddingBottom: "10px",
            }}
          >
            BILLING & SHIPPING
          </h2>
          <div style={styles.section}>
            <label style={styles.label}>Full Name (পুরো নাম)</label>
            <input
              style={styles.input}
              type="text"
              placeholder="Enter your Name (আপনার নাম লিখুন)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p style={styles.error}>{errors.name}</p>}

            <label style={styles.label}>Phone No (ফোন নাম্বার)</label>
            <input
              style={styles.input}
              type="tel"
              placeholder="Enter your Phone No (ফোন নাম্বার লিখুন)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <p style={styles.error}>{errors.phone}</p>}

            <label style={styles.label}>Address (ঠিকানা)</label>
            <input
              style={styles.input}
              type="text"
              placeholder="Enter Your Address (আপনার ঠিকানা লিখুন)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <p style={styles.error}>{errors.address}</p>}

            <label style={styles.label}>Thana & District (থানা ও জেলা)</label>
            <input
              style={styles.input}
              type="text"
              placeholder="Enter your Thana & District (থানা ও জেলা লিখুন)"
              value={thanaDistrict}
              onChange={(e) => setThanaDistrict(e.target.value)}
            />
            {errors.thanaDistrict && (
              <p style={styles.error}>{errors.thanaDistrict}</p>
            )}

            <label style={styles.label}>Country (optional)</label>
            <input style={styles.input} type="text" value="Bangladesh" disabled />
          </div>

          <div style={styles.section}>
            <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>
              ADDITIONAL INFORMATION
            </h3>
            <label style={styles.label}>Order Notes (optional)</label>
            <textarea
              style={styles.textarea}
              placeholder="Notes about your order, e.g. special notes for delivery."
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>

      {/* Right Side: Order Summary */}
      <div className="col-12 col-md-6  px-2" >

      <div className="m-2" style={styles.orderSummary} >
      
      <h2 style={{ fontSize: '18px' ,fontWeight : "bold" ,   borderBottom: "2px solid gray",marginBottom: "20px", paddingBottom:"10px" }}>YOUR ORDER</h2> {/* Smaller heading */}

  

        {cart.map((item) => (
          <div style={styles.orderItem}>
          <p>{ item.productName } × { item.quantity }</p>
          <div style={styles.summaryItem}>
            <span></span>
            <span>৳ {((item.productOffer
              ? item.productRegularPrice * (1 - item.productOffer / 100)
              : item.productRegularPrice) * item.quantity).toFixed(2)}</span>
          </div>
        </div>
        ))}

       
        {/* Subtotal and Shipping */}
        <div style={styles.summaryItem}>
          <strong>Subtotal:</strong>
          <span>৳ {totalPrice} </span>
        </div>

        {
          discountRate > 0 &&   <div className="mt-0" style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", padding: "5px 0" }}>
          <span style={{fontWeight: "bold"}}>Coupon Discount:</span>
          <span style={{ fontWeight: "bold" }}>- ৳ {discountRate}</span>
          </div>
        }

      <Shipping setShippingCost={setShippingCost}></Shipping>



        <div style={styles.summaryItem}>
          <strong>Total:</strong>
          <span>৳ { ((totalPrice - discountRate) + shippingCost.value).toFixed(2) } </span>
        </div>

        {/* Payment Method */}
        <div style={styles.section}>
          <h3 style={{ fontSize: '16px' }}>Cash on delivery</h3>
          <p style={{ fontSize: '14px' }}>Pay with cash upon delivery.</p>
        </div>




      

                  {isLoading ? (
                    <div className="spinner"></div>
                  ) : (

                     <button
                     className="btn button-opacityNormal"
                     onClick={()=> {
                    

                    

                     handleOrder()
                    
                    }}
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
                      width:"100%"
                    }}
             disabled={isLoading}
                  >
                  
                    PLACE ORDER 
                    
                  </button>

                  )}
      
                  <span>{orderStatus}</span>


                  {
                
                    !discountRateRedux &&  <div className="my-4" style={{ height: "1px", width: "100%", backgroundColor: "gray" }}></div>
    
    
                  }
              


                  <Coupon setCouponCodeText={setCouponCode} setDiscountRate={setDiscountRate} setIsHovered={setIsHovered} isHovered={isHovered} 
                  ></Coupon>
      </div>    
      </div>
    </div>
                  )}
    </Box>
    :   <div  style={styles.orderConfirmation}>
    <div style={styles.orderConfirmationCard}>
      <Image src={checkGif} alt="check" width={100} height={100} />
      <span className="order-status">Order Placed Successfully!</span>
    </div>
  </div>
  }
    
    
    </div>

    
  );
}
