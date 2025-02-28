"use client";
import FavoriteIcon from "@mui/icons-material/Favorite"; // Filled heart
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Import the wishlist icon
import CircularProgress from "@mui/material/CircularProgress"; // MUI loading spinner
import IconButton from "@mui/material/IconButton"; // Import MUI IconButton for better click handling
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Products.module.css"; // Assuming you use CSS modules

export default function Products() {
  let AllProduct = useSelector((state) => state.users.AllProduct);
  const [wishlist, setWishlist] = useState([]); // State to track wishlist items
  const [loading, setLoading] = useState(true); // State to track loading

  // Load wishlist from localStorage when the component mounts
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist)); // Parse and load the saved wishlist
    }
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Save the wishlist to localStorage whenever it changes
  useEffect(() => {
    if (!wishlist.length === false) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]); // This will run every time the `wishlist` state is updated

  // Set loading to false when products are available
  useEffect(() => {
    if (AllProduct && AllProduct.length > 0) {
      setLoading(false); // Data is loaded, stop loading
    }
  }, [AllProduct]);

  const handleWishlistClick = (productId) => {
    setWishlist((prevState) => {
      const isAlreadyInWishlist = prevState.includes(productId);

      // Toggle wishlist state for the product ID
      if (isAlreadyInWishlist) {
        // Remove from wishlist
        return prevState.filter((id) => id !== productId);
      } else {
        // Add to wishlist
        return [...prevState, productId];
      }
    });
  };

  const router = useRouter();

  return (
    <div>
      {loading ? (
        // Loading animation while products are being fetched
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            textAlign: "center",
          }}
        >
          <CircularProgress size={60} color="primary" /> {/* MUI Spinner */}
          <p
            style={{
              marginTop: "20px",
              fontSize: "18px",
              color: "#555",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            Loading products, please wait...
          </p>
        </div>
      ) : (
        <div
          className="row m-0 p-0"
          style={{ marginTop: "10px", padding: "0px", margin: "0px" }}
        >
          {AllProduct &&
            AllProduct.map((p, index) => (
              <div
                key={index}
                className="col-6 col-md-4 col-lg-4"
                style={{
                  padding: "10px",
                  display: wishlist.includes(p._id) ? "block" : "none",
                }}
              >
                <div
                  className={styles.productCard}
                  style={{ position: "relative" }} // Set relative position to parent div
                >
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the card click event
                      handleWishlistClick(p._id); // Toggle wishlist for this product
                    }}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      zIndex: 2,
                      color: wishlist.includes(p._id) ? "black" : "black", // Check if product is in wishlist
                    }}
                    aria-label="add to wishlist"
                  >
                    {wishlist.includes(p._id) ? (
                      <FavoriteIcon
                        fontSize="large"
                        style={{ color: "black" }}
                      /> // Filled heart icon
                    ) : (
                      <FavoriteBorderIcon
                        fontSize="large"
                        style={{ color: "black" }}
                      /> // Outlined heart icon
                    )}
                  </IconButton>
                  <div
                    className={styles.imageContainer}
                    onClick={() => {
                      console.log("this is click ");
                      router.push(`/product/${p._id}`);
                    }}
                  >
                    <Image
                      src={p.images[0]}
                      alt={p.productName}
                      layout="responsive"
                      width={200}
                      height={200}
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9ImJsdWUiIC8+PC9zdmc+" // Blue placeholder
                      loading="lazy"
                      priority={false}
                      quality={75}
                    />

                    <div className={styles.quickViewOverlay}>QUICK VIEW</div>
                  </div>
                  <div className={styles.productInfo}>
                    <h5 className={styles.productName}>{p.productName}</h5>

                    <div className={styles.priceContainer}>
                      {p.productOffer > 0 ? (
                        <div>
                          <span>
                            ৳
                            {(
                              p.productRegularPrice.toFixed(2) *
                              (1 - p.productOffer / 100)
                            ).toFixed(2)}
                          </span>
                          <span className={styles.originalPrice}>
                            ৳{p.productRegularPrice.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span>৳{p.productRegularPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
