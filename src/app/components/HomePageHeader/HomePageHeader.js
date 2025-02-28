"use client";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { blackColor, redColor } from "../../../../color";
import "./HomePageHeader.css";

export default function HomePageHeader() {
  const userInfo = useSelector((state) => state.users.userInfo);
  const AllProduct = useSelector((state) => state.users.AllProduct);
  // For testing purposes, use the below static state
  // const AllProduct = useState([...]);

  const router = useRouter();
  const cart = useSelector((state) => state.users.cart);
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 600);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (inputValue.length >= 3) {
      fetchSuggestions(inputValue);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const fetchSuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = AllProduct.filter((item) => {
      const queryLowerCase = query.toLowerCase();
      const nameMatches = item.productName
        .toLowerCase()
        .includes(queryLowerCase);
      const tagMatches = item.productTag.some((tag) =>
        tag.toLowerCase().includes(queryLowerCase)
      );
      const descriptionMatches = item.productDescription
        .toLowerCase()
        .includes(queryLowerCase);

      return nameMatches || tagMatches || descriptionMatches;
    });

    setSuggestions(filteredSuggestions);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.productName);
    setSuggestions([]);
  };

  const handleButtonClick = async (props) => {
    if (!userInfo) {
      router.push(`/login?callbackUrl=/${props}`);
    } else {
      router.push(`/${props}`);
    }
  };

  const profileStyles = {
    profileImage: {
      width: isSmallScreen ? "25px" : "25px",
      height: isSmallScreen ? "25px" : "25px",
      borderRadius: "50%",
      backgroundColor: "#007bff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: isSmallScreen ? "15px" : "20px",
      color: "#fff",
      margin: "0 auto",
    },
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          flexWrap: "nowrap",
          width: "100%",
        }}
      >
        <div>
          <Link href="/">
            <span style={{ fontSize: "24px" }}>BB</span>
          </Link>
        </div>
        <div
          className="px-2"
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative", // For positioning suggestions
          }}
        >
          <div
            className="d-flex px-2"
            style={{
              backgroundColor: "white",
              borderRadius: "20px 0px 0px 20px ",
              color: "gray",
              alignItems: "center",
              maxWidth: "500px",
              width: "100%",
              display: "flex",
            }}
          >
            <SearchIcon style={{ fontSize: "18px" }} />
            <input
              className="no-border-on-focus"
              style={{
                border: "none",
                flexGrow: 1,
                maxWidth: isSmallScreen ? "150px" : "100%",
                minWidth: "50px",
                fontSize: "11px",
                marginLeft: "3px",
                padding: "10px 5px",
              }}
              type="text"
              placeholder="Search..."
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          <button
            style={{
              border: "none",
              backgroundColor: "white",
              borderRadius: "0px 10px 10px 0px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px", // Added padding for vertical centering
            }}
          >
            <SendIcon style={{ color: "gray", fontSize: "15px" }} />
          </button>
          {suggestions.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                backgroundColor: "white",
                listStyle: "none",
                margin: 0,
                padding: "5px 0",
                boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                zIndex: 1000,
                maxHeight: "400px",
                overflowY: "auto",

                "@media (min-width: 500px)": {
                  // Example breakpoint for larger screens
                  width: "200px !important", // Width for larger screens
                },
              }}
            >
              <div className="row m-0 p-0">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={suggestion}
                    className="col-12 col-md-4 col-lg-4"
                    onClick={() => router.push(`/product/${suggestion._id}`)}
                  >
                    <div
                      key={index}
                      style={{
                        padding: "10px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid #eee",
                      }}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                      >
                        <Image
                          // unoptimized
                          src={suggestion.images[0]}
                          alt={suggestion.productName}
                          layout="responsive"
                          width={100}
                          height={100}
                          style={{
                            width: "40px",
                            height: "40px",
                            marginRight: "10px",
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                          {suggestion.productName}
                        </div>
                        <div className="d-flex justify-content-between">
                          <div style={{ display: "flex" }}>
                            {suggestion.productOffer > 0 ? (
                              <div>
                                <span style={{ fontSize: "13px" }}>
                                  €
                                  {Math.round(
                                    suggestion.productRegularPrice -
                                      suggestion.productRegularPrice *
                                        (suggestion.productOffer / 100)
                                  )}
                                </span>
                              </div>
                            ) : (
                              <div>
                                <span style={{ fontSize: "10px" }}>
                                  €{suggestion.productRegularPrice}
                                </span>
                              </div>
                            )}

                            <div>
                              {suggestion.productOffer > 0 && (
                                <span
                                  className="mx-1"
                                  style={{ fontSize: "13px" }}
                                >
                                  {" "}
                                  <del>€{suggestion.productRegularPrice}</del>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div
                          className="d-flex"
                          style={{
                            justifyContent: "space-between",
                            alignContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <span
                              className="text-xs text-md-sm text-lg-base"
                              style={{ color: redColor }}
                            >
                              {suggestion.productOffer > 0 &&
                                `-${suggestion.productOffer}% OFF`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div
          style={{ marginLeft: "10px", display: "flex", alignItems: "center" }}
        >
          <Link
            href="/productCart"
            style={{ textDecoration: "none", color: blackColor }}
          >
            <Badge badgeContent={totalQuantity} color="secondary">
              <ShoppingCartIcon style={{ fontSize: "20px" }} />
            </Badge>
          </Link>
        </div>
        <div
          style={{ marginLeft: "10px", display: "flex", alignItems: "center" }}
          onClick={() => handleButtonClick("orderShippingInfo")}
        >
          <LocalMallIcon style={{ fontSize: "20px", color: blackColor }} />
        </div>
        <div
          onClick={() => handleButtonClick("profile")}
          style={{
            marginLeft: "10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
          }}
        >
          {userInfo ? (
            <div style={profileStyles.profileImage}>
              {userInfo.username.charAt(0)}
            </div>
          ) : (
            <PersonIcon style={{ fontSize: "20px", color: blackColor }} />
          )}
        </div>
      </div>
    </div>
  );
}
