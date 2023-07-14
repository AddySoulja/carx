import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import SuccessModal from "./SuccessModal";
import Navbar from "../../common/navbar/Navbar";
import SideDrawer from "../../common/sidedrawer/SideDrawer";
import "./checkout.css";

const Checkout = () => {
  const { publicListings } = useSelector((state) => state.publicListings);
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const inDrawer = publicListings.find((post) => post._id === id && post);

  const handlePayment = () => {
    setModalOpen(true);
  };
  return (
    <>
      <Navbar />
      <Box
        className="checkout-layout"
        sx={{
          flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },
        }}
      >
        <Box
          sx={{
            width: { xs: "320px", sm: "320px", md: "450px", lg: "450px" },
          }}
          className="checkout-left"
        >
          <Typography className="checkout-left-header">
            Order Details
          </Typography>
          <SideDrawer inDrawer={inDrawer} checkout />
        </Box>
        <Box
          sx={{ width: { xs: "320px", sm: "320px", md: "700px", lg: "700px" } }}
          className="checkout-right"
        >
          <Typography className="checkout-right-header">Checkout</Typography>
          <form>
            <Box
              className="checkout-form"
              sx={{
                flexDirection: {
                  xs: "column",
                  sm: "column",
                  md: "row",
                  lg: "row",
                },
              }}
            >
              <Box
                sx={{
                  width: { xs: "320px", sm: "320px", md: "700px", lg: "700px" },
                }}
              >
                <Typography className="form-heading">
                  Billing Details
                </Typography>
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="Your Full Name" />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Your Email" />
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="number"
                  id="phone"
                  placeholder="Your Phone Number"
                />
                <label htmlFor="address">Full Address</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Your Full Address"
                />
              </Box>
              <Box
                sx={{
                  width: { xs: "320px", sm: "320px", md: "700px", lg: "700px" },
                }}
              >
                <Typography className="form-heading">
                  Upload Documents
                </Typography>
                <label htmlFor="aadhar">Upload Aadhar Card</label>
                <input type="file" id="aadhar" placeholder="Select Document" />
                <label htmlFor="pan">Upload Pan Card</label>
                <input type="file" id="pan" placeholder="Select Document" />
                <Button
                  variant="filled"
                  id="proceed-to-pay-btn"
                  onClick={handlePayment}
                >
                  Proceed to Pay
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
      {modalOpen && <SuccessModal open={modalOpen} setOpen={setModalOpen} />}
    </>
  );
};

export default Checkout;
