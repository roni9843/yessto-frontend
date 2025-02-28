import NewArrivalsUiSection from "@/app/components/NewArrivalsUiSection/NewArrivalsUiSection";
import { addToCart } from "@/app/redux/userSlice";
import AddShoppingCartTwoToneIcon from "@mui/icons-material/AddShoppingCartTwoTone";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBasketTwoToneIcon from "@mui/icons-material/ShoppingBasketTwoTone";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StickyBox from "react-sticky-box";
import {
  blackColor,
  grayColor,
  whiteColor,
  whiteColor_v_2,
  whiteColor_v_3,
} from "../../../../color";
import ProductCarousel from "./ProductCarousel";
import SingleProductINDESBtnReduxWrapped from "./SingleProductINDESBtnReduxWrapped";

import "./SingleProductPage.css";

export default function SingleProductPage({ productData }) {
  const [showMore, setShowMore] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.users.userInfo);
  const [value, setValue] = useState(0);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!productData) {
    return <div>Product not found</div>;
  }

  const htmlText = productData.productDescription;
  const discountPercentage = productData.productOffer;
  const discountedPrice =
    productData.productRegularPrice * (1 - discountPercentage / 100);

  return (
    <>
      <Head>
        <title>{productData.productName}</title>
        <meta property="og:image" content={productData.images[0]} />
        <meta
          property="og:description"
          content={productData?.shortDescription}
        />
      </Head>

      <div style={{ display: "flex", flexWrap: "wrap", margin: 0, padding: 0 }}>
        <div style={{ flex: "1 1 50%" }}>
          <StickyBox offsetTop={20} offsetBottom={20}>
            <ProductCarousel images={productData} />
            <div
              style={{
                height: "5px",
                width: "100%",
                backgroundColor: whiteColor_v_3,
              }}
            ></div>
          </StickyBox>
        </div>

        <div style={{ flex: "1 1 50%", padding: 10 }}>
          {/* Product Name and Offer Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <div style={{ color: "#666", fontSize: 14 }}>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: blackColor,
                  marginBottom: 10,
                }}
              >
                {productData.productName}
              </span>
              <span
                style={{
                  marginLeft: "20px",
                  backgroundColor: "#d4edda", // Light green color
                  color: "#155724", // Dark green text color for contrast
                  borderRadius: "5px",
                  padding: "3px 8px",
                }}
              >
                In Stock
              </span>
            </div>
            <div style={{ display: "none" }}>
              <FavoriteBorderIcon />
            </div>
          </div>
          {/* Price Section */}
          <div
            className="mt-3"
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 20,
              fontWeight: "bold",
            }}
          >
            {productData.productOffer > 0 ? (
              <div>
                <span style={{ fontSize: 24, color: blackColor }}>
                  ৳{discountedPrice.toFixed(2)}
                </span>
                <span
                  style={{
                    marginLeft: "5px",
                    fontSize: 14,
                    color: grayColor,
                    textDecoration: "line-through",
                    marginRight: "10px",
                  }}
                >
                  ৳{productData.productRegularPrice.toFixed(2)}
                </span>
              </div>
            ) : (
              <span style={{ fontSize: 24, color: blackColor }}>
                ৳{productData.productRegularPrice.toFixed(2)}
              </span>
            )}

            {discountPercentage && (
              <span
                style={{
                  fontSize: 15,
                  color: blackColor,
                  padding: 5,
                  marginLeft: 10,
                  backgroundColor: "#14FF00",
                }}
              >
                {discountPercentage}% OFF
              </span>
            )}
          </div>
          {/* Additional Sections */}
          <div style={{ marginBottom: 20 }}>
            {/* Video Link Section */}

            {/* PDF Download Section */}

            {/* Short Description Section */}
            {productData?.shortDescription &&
              productData.shortDescription !== "" && (
                <div style={{ marginBottom: 20 }}>
                  <p>{productData.shortDescription}</p>
                </div>
              )}

            {/* Additional Info Section */}

            {/* Weight Section */}
          </div>
          {/* Action Buttons */}

          <SingleProductINDESBtnReduxWrapped
            productData={productData}
          ></SingleProductINDESBtnReduxWrapped>

          {productData?.productYoutubeLink &&
            productData.productYoutubeLink !== "" && (
              <div
                style={{
                  marginTop: 20,
                  display:
                    productData.productYoutubeLink !== "" ? "block" : "none",
                }}
              >
                <iframe
                  width="100%"
                  //    height="315"
                  src={"https://www.youtube.com/embed/6stlCkUDG_s?si=X9-AAIhJts4rlvfg"}
                  //src={productData.productYoutubeLink}
                  title="Product Video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          {productData?.pdfFileName && productData.pdfFileName !== "" && (
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "center",
              }}
            >
              {
                // console.log("this is pdf -> ", productData.pdfFileName)
              }
              <a
                href={`https://backend.yeesto.com/controller/uploads/${productData.pdfFileName}`}
                download
              >
                <button
                  style={{
                    backgroundColor: blackColor,
                    color: whiteColor,
                    border: "none",
                    padding: "5px 20px",
                    borderRadius: 5,
                    cursor: "pointer",
                  }}
                >
                  Download PDF
                </button>
              </a>
            </div>
          )}
          <Box
            sx={{
              marginTop: 5,
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="product details tabs"
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "black", // Changes the indicator color to red
                },
              }}
            >
              <Tab
                label="Description"
                sx={{
                  color: "black", // Default color of the tab label
                  "&.Mui-selected": {
                    color: "black", // Color of the tab label when selected
                  },
                }}
              />
              <Tab
                label="Additional Information"
                sx={{
                  color: "black", // Default color of the tab label
                  "&.Mui-selected": {
                    color: "black", // Color of the tab label when selected
                  },
                }}
              />
            </Tabs>

            <Box sx={{ p: 3 }}>
              {value === 0 && productData.productDescription !== "" && (
                <div>
                  <div
                    style={{
                      width: "100",
                      position: "relative",
                      height: showMore ? "auto" : 100,
                      overflow: "hidden",
                    }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: htmlText }} />
                    {!showMore && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          width: "100%",
                          height: 100,
                          background: `linear-gradient(to bottom, rgba(255, 255, 255, 0), ${whiteColor_v_2})`,
                        }}
                      />
                    )}
                  </div>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                  >
                    <Button
                      onClick={handleShowMore}
                      variant="outlined"
                      size="small"
                      sx={{
                        color: "black", // Text color
                        borderColor: "black", // Border color
                        "&:hover": {
                          borderColor: "black", // Border color on hover
                        },
                      }}
                    >
                      {showMore ? "Show less" : "Show  more"}
                    </Button>
                  </Box>
                </div>
              )}
              {value === 1 && (
                <Typography variant="body1">
                  {/* Add your additional information content here */}

                  {productData.additionalInfo !== "" && (
                    <div>
                      <div
                        style={{
                          position: "relative",
                          height: showMore ? "auto" : 100,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: productData.additionalInfo,
                          }}
                        />
                        {!showMore && (
                          <div
                            style={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              width: "100%",
                              height: 100,
                              background: `linear-gradient(to bottom, rgba(255, 255, 255, 0), ${whiteColor_v_2})`,
                            }}
                          />
                        )}
                      </div>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          mt: 2,
                        }}
                      >
                        <Button
                          onClick={handleShowMore}
                          variant="outlined"
                          size="small"
                          sx={{
                            color: "black", // Text color
                            borderColor: "black", // Border color
                            "&:hover": {
                              borderColor: "black", // Border color on hover
                            },
                          }}
                        >
                          {showMore ? "Show less" : "Show more"}
                        </Button>
                      </Box>
                    </div>
                  )}
                </Typography>
              )}
            </Box>
          </Box>
          {/* Order Now and + Add to Cart Buttons at the Bottom */}
          {/* Your existing product details code here */}


          {
            1 == 2 &&    <Box
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              width: "100%",
              backgroundColor: whiteColor,
              borderTop: `1px solid ${grayColor}`,
              display: { xs: "flex", md: "none" }, // Show only on small screens
              justifyContent: "space-around",
              padding: "10px 0", // Reduced padding for small screens
              boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.2)",
              zIndex: 10000,
            }}
          >
            <Button
              sx={{
                backgroundColor: blackColor,
                color: whiteColor,
                padding: { xs: "8px 20px", sm: "12px 25px" }, // Responsive padding
                fontWeight: "bold",
                fontSize: { xs: 14, sm: 16 }, // Responsive font size
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Shadow for button
                transition: "transform 0.1s ease, box-shadow 0.1s ease",
                "&:hover": {
                  backgroundColor: blackColor,
                  boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2)", // Darker shadow on hover
                },
                "&:active": {
                  backgroundColor: blackColor,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Shadow effect on click
                  transform: "scale(0.95)", // Slightly reduce size on click
                },
                "&:focus": {
                  backgroundColor: blackColor,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Shadow effect on focus
                },
              }}
              onClick={() => {
                // Initialize product with quantity 1
                const payload = { ...productData, quantity: 1 };

                // Retrieve existing cart items from localStorage
                let cartItems = localStorage.getItem("cartItems");
                cartItems = cartItems ? JSON.parse(cartItems) : [];

                // Check if the product already exists in the cart based on _id
                const existingProductIndex = cartItems.findIndex(
                  (item) => item._id === payload._id
                );

                if (existingProductIndex !== -1) {
                  // If the product exists, update its quantity
                  cartItems[existingProductIndex].quantity += 1;
                } else {
                  // If the product doesn't exist, add it with a quantity of 1
                  cartItems.push(payload);
                }

                console.log("this is cart ->  ", cartItems);

                // Save the updated cart array back to localStorage
                localStorage.setItem("cartItems", JSON.stringify(cartItems));

                dispatch(addToCart(payload));
              }}
            >
              <AddShoppingCartTwoToneIcon
                sx={{
                  color: whiteColor,
                  marginRight: 1,
                  fontSize: { xs: 18, sm: 24 },
                }} // Responsive icon size
              />
              + Add to Cart
            </Button>

            <Button
              sx={{
                border: `2px solid ${"black"}`,
                color: "black",
                padding: { xs: "8px 20px", sm: "12px 25px" }, // Responsive padding
                fontWeight: "bold",
                fontSize: { xs: 14, sm: 16 }, // Responsive font size
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Shadow for button
                transition: "background-color 0.3s ease, transform 0.1s ease",
                "&:hover": {
                  backgroundColor: blackColor,
                  boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2)", // Darker shadow on hover
                  color: whiteColor,
                },
                "&:active": {
                  backgroundColor: blackColor,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Shadow effect on click
                  transform: "scale(0.95)", // Slightly reduce size on click
                  color: whiteColor,
                },
              }}
              onClick={() => {
                // Initialize product with quantity 1
                const payload = { ...productData, quantity: 1 };

                // Retrieve existing cart items from localStorage
                let cartItems = localStorage.getItem("cartItems");
                cartItems = cartItems ? JSON.parse(cartItems) : [];

                // Check if the product already exists in the cart based on _id
                const existingProductIndex = cartItems.findIndex(
                  (item) => item._id === payload._id
                );

                if (existingProductIndex !== -1) {
                  // If the product exists, update its quantity
                  cartItems[existingProductIndex].quantity += 1;
                } else {
                  // If the product doesn't exist, add it with a quantity of 1
                  cartItems.push(payload);
                }

                console.log("this is cart ->  ", cartItems);

                // Save the updated cart array back to localStorage
                localStorage.setItem("cartItems", JSON.stringify(cartItems));

                dispatch(addToCart(payload));
                // router.push("/checkout");
               // ? old route 
                // router.push("/productCart");




                // ? new route 
                if (!userInfo) {
                  router.push("/login?callbackUrl=/checkout");
                } else {
                  router.push("/checkout");
                }

                // if (!userInfo) {
                //   router.push(`/login?callbackUrl=/${props}`);
                // } else {
                //   router.push(`/${props}`);
                // }
              }}
            >
              <ShoppingBasketTwoToneIcon
                sx={{
                  color: "black",
                  marginRight: 1,
                  fontSize: { xs: 18, sm: 24 },
                }} // Responsive icon size
              />
              Order Now
            </Button>
          </Box>
          }
       
        </div>
      </div>

      {/* Related Products Section */}
      <div style={{ marginTop: 50 }}>
        <NewArrivalsUiSection />
      </div>
    </>
  );
}

/**
 * 
 * <DiscoverMoreTitle></DiscoverMoreTitle>
 * 
 *  <SinglePoster
        ImageLink={"https://i.ibb.co/Kssr3Qz/Group-11.png"}
      ></SinglePoster>

 <ProductListUiComponent></ProductListUiComponent>

  
  <ExclusiveItemsPoster />

  <CategoryProductList
          category={productData.productCategory}
          title="Related Products"
        />
 *  */
