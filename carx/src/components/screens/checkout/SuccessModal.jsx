import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./checkout.css";

const SuccessModal = ({ open, setOpen }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="success-modal"
        aria-describedby="success-modal"
      >
        <Box className="success-modal">
          <CloseIcon id="close-modal" onClick={handleClose} />
          <Typography id="success-modal-head" variant="h6" component="h2">
            <img
              alt="success-gif"
              id="success-gif"
              src="https://media.tenor.com/bm8Q6yAlsPsAAAAj/verified.gif"
            />
            Hurray!!!
          </Typography>
          <Typography id="success-modal-desc" sx={{ mt: 2 }}>
            Your Order Has Been Placed.
          </Typography>
          <Button id="view-order-btn">View Order</Button>
        </Box>
      </Modal>
    </>
  );
};

export default SuccessModal;
