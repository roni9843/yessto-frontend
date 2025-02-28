import { Facebook, LinkedIn, Twitter } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

export default function AboutPage() {
  return (
    <Container>
      {/* Section 1: Hero Section with Image */}
      <Box
        sx={{
          backgroundImage:
            "url(https://i.ibb.co/FmwMRqM/pexels-cottonbro-5532664.jpg)", // Use the correct image URL
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "350px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 5,
          color: "#fff",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
          }}
        >
          About Us
        </Typography>
      </Box>

      {/* Section 5: Meet Our Team */}
     
      <Box sx={{ mb: 5 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Box textAlign="center">
              <Avatar
                src="/Nazmus.jpg"
                alt="John Doe"
                sx={{
                  width: 250,
                  height: 250,
                  mb: 2,
                  mx: "auto",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Engr. Md. Nazmus Sakib
              </Typography>
              <Typography variant="body2">CEO</Typography>
      
              {/* Social Media Icons */}
              <Box sx={{ mt: 2 }}>
                <IconButton color="primary" aria-label="Facebook">
                  <Facebook />
                </IconButton>
                <IconButton color="primary" aria-label="Twitter">
                  <Twitter />
                </IconButton>
                <IconButton color="primary" aria-label="LinkedIn">
                  <LinkedIn />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      

      <Divider sx={{ mb: 5 }} />

      {/* Section 3: Vision and Mission */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
        Company Name: Ai Home Tech
        </Typography>
     
      </Box>
      {/* Section 3: Vision and Mission */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
          Our Vision & Mission
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, textAlign: "justify", mb: 3 }}
        >
          Our vision is to become a global leader in our industry by offering
          unparalleled solutions that transform the way people interact with
          technology. We aim to be at the forefront of innovation, setting new
          standards of quality and excellence.
          <br />
          <br />
          Our mission is to empower businesses and individuals through
          cutting-edge products and services that drive growth, efficiency, and
          success. We are committed to delivering superior customer experiences
          by ensuring our solutions meet the highest standards of reliability
          and performance.
        </Typography>
      </Box>
      {/* Section 3: Vision and Mission */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
        Address
        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, textAlign: "justify", mb: 3 }}
        >
        59/1-A,<br />
        West Raja Bazar,  Panthapath, Dhaka 1215
        
        </Typography>
      </Box>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
        Contact Information:

        </Typography>
        <Typography
          variant="body1"
          sx={{ lineHeight: 1.8, textAlign: "justify", mb: 3 }}
        >
        CEO Email: nsakib32@gmail.com <br />
        CEO mobile number : 01734700316
        
        </Typography>
      </Box>

      <Divider sx={{ mb: 5 }} />

      {/* Section 4: What We Offer */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 4 }}>
          What We Offer
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
              High-Quality Products
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              Our products are crafted with the utmost attention to detail,
              ensuring quality that you can rely on. We offer a wide range of
              solutions designed to meet the specific needs of our customers.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
              Exceptional Service
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              We believe that great service goes hand-in-hand with great
              products. Our team is dedicated to providing top-notch customer
              support, ensuring a seamless experience from start to finish.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
              Continuous Innovation
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              Innovation is at the core of everything we do. We are constantly
              exploring new ideas and technologies to improve our offerings and
              stay ahead of industry trends.
            </Typography>
          </Grid>
        </Grid>
      </Box>


      <Divider sx={{ mb: 5 }} />

    
    </Container>
  );
}
