import React, { useState } from "react";
import { Box, Button, Container } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../../common/navbar/Navbar";
import ModalForm from "../../common/modal/ModalForm";
import DisplayCard from "../../common/card/DisplayCard";
import Loader from "../../common/loader/Loader";
import { usePostListingMutation } from "../../../redux/slices/usersApiSlice";
import "react-toastify/dist/ReactToastify.css";
import "./inventory.css";

const Inventory = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [postListing, { isLoading }] = usePostListingMutation();

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Container>
            <Box className="inventory-header">
              <h2>Inventory</h2>
              <Button
                className="add-listing-btn"
                sx={{ ":hover": { backgroundColor: "green" } }}
                onClick={() => setOpen((prev) => !prev)}
                variant="contained"
              >
                Add a listing
              </Button>
            </Box>
            <Box className="inventory-layout">
              {userInfo.posts.length > 0 &&
                userInfo.posts.map((data) => (
                  <DisplayCard key={data._id} vehicleData={data} />
                ))}
            </Box>
            <ModalForm
              open={open}
              setOpen={setOpen}
              postListing={postListing}
            />
          </Container>
        </>
      )}
    </>
  );
};

export default Inventory;
