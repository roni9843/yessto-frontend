import {
  ArrowDropDown as ArrowDropDownIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PersonIcon from "@mui/icons-material/Person";
import {
  AppBar,
  Badge,
  Box,
  Drawer,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image"; // Assuming Next.js

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomerHeaderMenu from "./CustomerHeaderMenu";

export default function CustomerHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

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

  const drawerContent = (
    <Box
      sx={{
        width: 250,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "0px", // No gap between items
        backgroundColor: "white",
        // backgroundColor: "#f4f4f4",
      }}
    >
      {/* Menu Option Styling */}
      {[
        { label: "HOME", link: "/" },
        // {
        //   label: "ALL Products",
        //   icon: <ArrowDropDownIcon />,
        //   action: handleMenuClick,
        // },
        { label: "ABOUT", link: "/about" },
        { label: "CONTACT", link: "/contact" },
      ].map((item, index) => (
        <Box
          key={index}
          onClick={item.action || (() => router.push(item.link))}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            cursor: "pointer",
            borderBottom: "1px solid #ccc", // Bottom border for each option
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#f0f0f0", // Light gray hover effect
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: "#333", fontWeight: 500, fontSize: 14 }}
          >
            {item.label}
          </Typography>
          {item.icon || null}
        </Box>
      ))}

      {/* Search Bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: "4px",
          overflow: "hidden",
          width: "100%",
          height: "40px",
          marginTop: "20px",
          display: "none",
        }}
      >
        <InputBase
          placeholder="Search Here"
          sx={{
            flex: 1,
            paddingLeft: "12px",
            fontSize: "14px",
            height: "100%",
            color: "#333",
          }}
        />
        <IconButton
          type="submit"
          sx={{
            backgroundColor: "#FF5555", // Red theme for the button
            color: "#fff",
            padding: "8px",
            height: "100%",
            "&:hover": {
              backgroundColor: "#FF3333",
            },
            display: "none",
          }}
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );

  const profileStyles = {
    profileImage: {
      width: isSmallScreen ? "20px" : "20px",
      height: isSmallScreen ? "20px" : "20px",
      borderRadius: "50%",
      backgroundColor: "black",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: isSmallScreen ? "12px" : "12px",
      color: "#fff",
      margin: "0 auto",
    },
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ backgroundColor: "#fff", height: "60px" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: { xs: "0 10px", lg: "0 50px" },
          minHeight: "60px",
        }}
      >
        {/* Left Side: Logo and Mobile Menu Icon */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton
            onClick={toggleDrawer}
            sx={{
              color: "#000",
              transition: "color 0.3s",
              ":hover": { color: "gray" }, // Hover effect
            }}
          >
            <MenuIcon
              sx={{
                fontSize: "30px", // Increased size
              }}
            />
          </IconButton>
          
          )}

          {/* Logo */}
          <Box
            sx={{ cursor: "pointer", ml: isMobile ? "10px" : "0px" }}
            onClick={() => router.push(`/`)}
          >
            <Image
             src="/image_logo.png"
              alt="Logo"
              width={50}
              height={50}
              style={{ objectFit: "contain" }}
            />
          </Box>

          {/* Navigation Links (Visible on larger screens) */}
          {!isMobile && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "25px",
                  justifyContent: "flex-start",
                  ml: "20px",
                }}
              >
                {/* Home Link */}
                <Typography
                  onClick={() => router.push(`/`)}
                  variant="body1"
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "color 0.3s",
                    ":hover": { color: "gray" }, // Hover effect
                  }}
                >
                  HOME
                </Typography>

                {/* All Product Menu */}
                <Box
                  sx={{
                    display: "none",
                    // display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    cursor: "pointer",
                    color: "black",
                    transition: "color 0.3s",
                    ":hover": { color: "gray" }, // Hover effect
                  }}
                  onClick={handleMenuClick}
                  id="all-product-menu-trigger"
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      color: "black",
                    }}
                  >
                    ALL Products
                  </Typography>
                  <ArrowDropDownIcon />
                </Box>

                {/* About Link */}
                <Typography
                  onClick={() => router.push(`/about`)}
                  variant="body1"
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "color 0.3s",
                    ":hover": { color: "gray" }, // Hover effect
                  }}
                >
                  ABOUT
                </Typography>

                {/* Contact Link */}
                <Typography
                  onClick={() => router.push(`/contact`)}
                  variant="body1"
                  sx={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "14px",
                    cursor: "pointer",
                    transition: "color 0.3s",
                    ":hover": { color: "gray" }, // Hover effect
                  }}
                >
                  CONTACT
                </Typography>
              </Box>

              {/* Search Bar */}
              <Box
                sx={{
                  display: "none", // Hidden by default, you can change it to 'flex' if needed
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "0",
                  maxWidth: "500px",
                  width: "100%",
                  height: "40px",
                  ml: "20px",
                }}
              >
                <InputBase
                  placeholder="Search Here"
                  sx={{ flex: 1, pl: "8px", fontSize: "14px", height: "100%" }}
                />
                <IconButton
                  type="submit"
                  sx={{
                    backgroundColor: "gray",
                    borderRadius: "0",
                    color: "#fff",
                    height: "100%",
                    ":hover": { backgroundColor: "#C70039" }, // Hover effect
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            </>
          )}
        </Box>

        {/* Right Side: Shopping Cart and User Profile */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
        {/* Shopping Cart Icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <FavoriteIcon
            sx={{
              fontSize: "30px", // Increased size
              color: "black",
              ml: "10px",
              cursor: "pointer",
              transition: "transform 0.3s",
              ":hover": { transform: "scale(1.1)", color: "gray" },
            }}
            onClick={() => {
              router.push(`/wishlist`);
            }}
          />
        </div>
        <div
          onClick={() => {
            router.push(`/productCart`);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Badge
            badgeContent={totalQuantity}
            color="secondary"
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "black",
                color: "white",
              },
            }}
          >
            <AddShoppingCartIcon
              sx={{
                fontSize: "30px", // Increased size
                color: "black",
                ml: "10px",
                cursor: "pointer",
                transition: "transform 0.3s",
                ":hover": { transform: "scale(1.1)", color: "gray" },
              }}
            />
          </Badge>
        </div>
      
        {/* Local Mall Icon */}
        <LocalMallIcon
          sx={{
            fontSize: "30px", // Increased size
            color: "black",
            ml: "10px",
            cursor: "pointer",
            transition: "transform 0.3s",
            ":hover": { transform: "scale(1.1)", color: "gray" },
          }}
          onClick={() => handleButtonClick("orderShippingInfo")}
        />
      
        {/* Profile Icon */}
        <Box
        sx={{
          ml: "10px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          transition: "transform 0.3s",
          ":hover": { transform: "scale(1.1)", color: "gray" },
        }}
        onClick={() => handleButtonClick("profile")}
      >
        {userInfo ? (
          <Box
            sx={{
              backgroundColor: "black",
              borderRadius: "50%",
              width: "30px", // Adjust size of the circle
              height: "30px", // Adjust size of the circle
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "20px", // Increase font size for the first character
                color: "white",
                fontWeight: "bold",
              }}
            >
              {userInfo.username.charAt(0)}
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              backgroundColor: "black",
              borderRadius: "50%",
              padding: "5px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "30px", // Adjust size of the circle for consistency
              height: "30px", // Adjust size of the circle for consistency
            }}
          >
            <PersonIcon sx={{ fontSize: "25px", color: "white" }} /> {/* Adjusted icon size */}
          </Box>
        )}
      </Box>
      
      </Box>
      
      </Toolbar>

      {/* Mobile Sidebar Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        {drawerContent}
      </Drawer>

      {/* Dropdown Menu for ALL Products */}

      <CustomerHeaderMenu
        handleMenuClick={handleMenuClick}
        handleMenuClose={handleMenuClose}
        anchorEl={anchorEl}
      ></CustomerHeaderMenu>
    </AppBar>
  );
}
