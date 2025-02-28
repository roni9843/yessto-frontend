import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Coupon({ isHovered, setIsHovered,setDiscountRate ,setCouponCodeText}) {




  const discountRateRedux = useSelector((state) => state.users.discountRate);
  const couponCodeRedux = useSelector((state) => state.users.couponCode);

  const [couponCode, setCouponCode] = useState(couponCodeRedux);
  const [couponData, setCouponData] = useState( couponCodeRedux); // State to hold fetched coupon data
  const [validationMessage, setValidationMessage] = useState(couponCodeRedux ? `Success! The coupon ${couponCodeRedux} has been applied. You receive a discount of ৳ ${discountRateRedux}!` : null); // State for validation message
  const [isValid, setIsValid] = useState(discountRateRedux ? 1 : null); // State to track validity

  // Function to fetch coupon data
  const fetchCouponData = async () => {
    try {
      const response = await fetch('https://backend.yeesto.com/coupons'); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch coupon data');
      }
      const data = await response.json();
      setCouponData(data); // Set the fetched coupon data
    } catch (error) {
      console.error('Error fetching coupon data:', error);
    }
  };

  useEffect(() => {
    fetchCouponData(); // Fetch coupon data when the component mounts
  }, []);

  const handleApplyCoupon = async () => {
    if (couponCode) {
      try {
        const response = await fetch(`https://backend.yeesto.com/coupons/validate/${couponCode}`); // Validate the coupon code
        if (!response.ok) {
          throw new Error('Invalid coupon code');
        }
        const data = await response.json();
        setValidationMessage(`Success! The coupon "${data.couponCode}" has been applied. You receive a discount of ৳ ${data.discountRate}!`); // Set success message with details
        setDiscountRate(data.discountRate)
        setIsValid(true); // Set validity to true
        setCouponCodeText(couponCode)
        console.log(`Applying coupon: ${couponCode}`, data); // Handle successful coupon application
      } catch (error) {
        setValidationMessage(error.message); // Set failure message
        setIsValid(false); // Set validity to false

        setDiscountRate(0)
       
        setCouponCodeText(null)

      }
    } else {
      setValidationMessage('Please enter a coupon code.'); // Message for empty input
      setIsValid(false); // Set validity to false
    }
  };

  return (
    <div>
    {
      !couponCodeRedux && 
      <div className="mb-5 mt-2">
        <div className='mt-2'>
          <span style={{ 
            fontSize: "18px", 
            fontWeight: "bold", 
            color: "#333", 
            marginBottom: "10px", 
            display: "block" 
          }}>
            Coupon
          </span>
        </div>
        <input
          type="text"
          placeholder="Coupon code"
          value={couponCode === 0 ? "" : couponCode} // Controlled input
          onChange={(e) => setCouponCode(e.target.value)} // Update coupon code state
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />
        <button
          className="btn btn-outline-primary"
          style={{
            width: "100%",
            padding: "10px",
            border: "1px solid black",
            color: isHovered ? "white" : "black",
            backgroundColor: isHovered ? "black" : "transparent",
            transition: "background-color 0.3s ease, color 0.3s ease",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleApplyCoupon} // Call function on button click
        >
          Apply coupon
        </button>
        {validationMessage && (
          <div style={{ marginTop: "10px", color: isValid ? "green" : "red" }}>
            {validationMessage}
          </div>
        )}
      </div>
    }
  </div>
  
   
  );
}
