import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

export default function Shipping({ setShippingCost }) {
  const [shippingInfo, setShippingInfo] = useState({});
  const [selectedShipping, setSelectedShipping] = useState('');
  const [loading, setLoading] = useState(false);

  const shippingCost = useSelector((state) => state.users.shippingCost);

  const setSelectedShippingfunc = (props) => {
    if (shippingCost.value === 0) {
      setSelectedShipping(props);
      setShippingCost({
        value: parseInt(props),
        state: "insideDhaka"
      });
    } else {
      setSelectedShipping(shippingCost.value?.toString());
    }
  };

  const baseUrl = 'https://backend.yeesto.com/shipping/';

  const fetchShippingInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}66f52cedd61b11378679f834`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setShippingInfo(data);
      setSelectedShippingfunc(data.insideDhaka.toString());
    } catch (error) {
      console.error('Error fetching shipping info:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchShippingInfo();
  }, []);

  const handleShippingChange = (event) => {
    setSelectedShipping(event.target.value);
    setShippingCost({
      value: parseInt(event.target.value),
      state: event.target.id
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
          zIndex: 1000 // Ensure it is above other elements
        }}>
          <CircularProgress />
        </div>
      )}
      <div style={{
        display: "flex",
        flexDirection: "column",
        fontSize: "14px",
        margin: "15px 0",
        padding: "10px 15px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9"
      }}>
        <span style={{
          fontWeight: "bold",
          marginBottom: "10px",
          fontSize: "16px",
          color: "#333"
        }}>Shipping:</span>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
          <input
            type="radio"
            id="shippingDhaka"
            name="shipping"
            value={shippingInfo.insideDhaka}
            checked={selectedShipping === shippingInfo.insideDhaka?.toString()}
            onChange={handleShippingChange}
            style={{ marginRight: "10px" }}
          />
          <label htmlFor="shippingDhaka" style={{ fontSize: "14px", color: "#555" }}> ঢাকার মধ্যে: {shippingInfo.insideDhaka}৳</label>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="radio"
            id="shippingOutsideDhaka"
            name="shipping"
            value={shippingInfo.outsideDhaka}
            checked={selectedShipping === shippingInfo.outsideDhaka?.toString()}
            onChange={handleShippingChange}
            style={{ marginRight: "10px" }}
          />
          <label htmlFor="shippingOutsideDhaka" style={{ fontSize: "14px", color: "#555" }}> ঢাকার বাহিরে: {shippingInfo.outsideDhaka}৳</label>
        </div>
      </div>
    </div>
  );
}