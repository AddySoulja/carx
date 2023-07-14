import React from "react";
import Navbar from "../../common/navbar/Navbar";
import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
import DisplayCard from "../../common/card/DisplayCard";
import "./favorites.css";

const Favorites = () => {
  const { publicListings } = useSelector((state) => state.publicListings);

  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <Navbar />
      <Container>
        <h1>Favorites</h1>
        <Box className="favorites-layout">
          {userInfo.favorites.length > 0 &&
            publicListings.map(
              (listing) =>
                userInfo.favorites.includes(listing._id) && (
                  <DisplayCard vehicleData={listing} />
                )
            )}
        </Box>
      </Container>
    </>
  );
};

export default Favorites;
