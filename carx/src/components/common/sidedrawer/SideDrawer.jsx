import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, ButtonBase, Typography, Card } from "@mui/material";
import "./sidedrawer.css";

export const SideDrawer = ({ inDrawer, checkout }) => {
  const [isRaised, setIsRaised] = useState({ target: "", value: true });

  const navigate = useNavigate();
  const handleRiseUp = (e) => {
    setIsRaised((prev) => {
      return { ...prev, target: e.target.id };
    });
  };
  const handleRiseDown = () => {
    setIsRaised({ target: "", value: true });
  };
  return (
    <Box className="side-drawer">
      <Box className="display-image">
        <img
          alt="cars"
          className="img"
          src={
            inDrawer.images[0] ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRYpno8CE-P69WpuE2G9lZMh0Afg3ZehDWsAlnid2XotX7ej8crpmdl25PXDR_Jq0Fd04&usqp=CAU"
          }
        />
      </Box>
      <Box className="side-drawer-head">
        <Typography className="price">₹{inDrawer.price}.00</Typography>
        <Box className="info">
          <Box width="60%">
            <Typography className="info-title">
              {inDrawer.make} {inDrawer.model} {inDrawer.year}
            </Typography>
            <Typography className="info-contact">
              Seller- {inDrawer.contact}
            </Typography>
          </Box>
          <Box
            className="info-color-box"
            sx={{
              width: "30%",
              marginRight: { xs: "20px", sm: "20px", md: 0, lg: 0 },
            }}
          >
            <Typography className="info-color-label">Color</Typography>
            <div
              className="info-color"
              style={{ backgroundColor: inDrawer.originalColor }}
            />
          </Box>
        </Box>
        <Typography className="description">{inDrawer.description}</Typography>
      </Box>
      <div className="divider" />
      <Box className="specifications">
        <Box>
          <Box className="col-row">
            <Typography className="col-label">Make</Typography>
            <Typography className="col-value">{inDrawer.make}</Typography>
          </Box>
          <Box className="col-row">
            <Typography className="col-label">Model</Typography>
            <Typography className="col-value">{inDrawer.model}</Typography>
          </Box>
          <Box className="col-row">
            <Typography className="col-label">Year</Typography>
            <Typography className="col-value">{inDrawer.year}</Typography>
          </Box>
        </Box>
        <Box>
          <Box className="col-row">
            <Typography className="col-label">Mileage</Typography>
            <Typography className="col-value">{inDrawer.mileage}</Typography>
          </Box>
          <Box className="col-row">
            <Typography className="col-label">Power</Typography>
            <Typography className="col-value">{inDrawer.power} Hp</Typography>
          </Box>
          <Box className="col-row">
            <Typography className="col-label">Speed</Typography>
            <Typography className="col-value">{inDrawer.speed} Kmph</Typography>
          </Box>
        </Box>
        <Box>
          <Box className="col-row">
            <Typography className="col-label">Driven</Typography>
            <Typography className="col-value">{inDrawer.driven} Kms</Typography>
          </Box>
          <Box className="col-row">
            <Typography className="col-label">Damages</Typography>
            <Typography className="col-value">{inDrawer.damages}</Typography>
          </Box>
          <Box className="col-row">
            <Typography className="col-label">Accidents</Typography>
            <Typography className="col-value">{inDrawer.accidents}</Typography>
          </Box>
        </Box>
        <Box>
          <Box className="col-row">
            <Typography className="col-label">Owners</Typography>
            <Typography className="col-value">{inDrawer.owners}</Typography>
          </Box>
        </Box>
      </Box>
      {checkout || (
        <Box className="sidebar-button-layout">
          <ButtonBase
            sx={{
              width: { xs: "100%", sm: "100%", md: "200px", lg: "200px" },
            }}
            onClick={() => navigate(`/checkout/${inDrawer._id}`)}
            className="buy-btn"
            children={
              <Card
                className="buy-btn"
                id="buy-btn"
                onMouseEnter={handleRiseUp}
                onMouseLeave={handleRiseDown}
                raised={isRaised.target === "buy-btn" && isRaised.value}
              >
                View
              </Card>
            }
          />
          <ButtonBase
            className="contact-btn"
            sx={{
              width: { xs: "100%", sm: "100%", md: "200px", lg: "200px" },
            }}
            children={
              <Card
                className="contact-btn"
                id="contact-btn"
                onMouseEnter={handleRiseUp}
                onMouseLeave={handleRiseDown}
                raised={isRaised.target === "contact-btn" && isRaised.value}
              >
                Contact Seller
              </Card>
            }
          />
        </Box>
      )}
    </Box>
  );
};

export default SideDrawer;
