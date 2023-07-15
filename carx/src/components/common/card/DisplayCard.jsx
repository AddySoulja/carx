import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Divider, Popover, MenuItem, Box, Typography } from "@mui/material";
import "./card.css";
import {
  useDeleteListingMutation,
  useUpdateUserMutation,
} from "../../../redux/slices/usersApiSlice";
import { useCookies } from "react-cookie";
import { setCredentials } from "../../../redux/slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { setPublicListings } from "../../../redux/slices/publicListingsSlice";

const DisplayCard = ({ vehicleData, onClick }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [cookie, setCookie] = useCookies(["jwt"]);
  const [hovering, setHovering] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteListing, { isLoading }] = useDeleteListingMutation();
  const [updateProfile] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const deletePost = async () => {
    try {
      const formData = new FormData();
      formData.append("_id", vehicleData._id);
      const res = await deleteListing({
        formData,
        cookie,
      }).unwrap();
      const user = res.user;
      setCookie("jwt", user.token);
      dispatch(setCredentials(user));
      dispatch(setPublicListings(res.publicListings));
      toast.success("Post deleted successfully!");
    } catch (e) {
      toast.error(e?.data?.message || e.message);
    }
    handleClose();
  };

  const handleFavorites = async () => {
    try {
      const formData = new FormData();
      formData.append("favId", vehicleData._id);
      const res = await updateProfile({
        formData,
        cookie,
      }).unwrap();
      dispatch(setCredentials(res.user));
      if (userInfo.favorites.length > res.user.favorites.length) {
        toast.success("Removed from favorites");
      } else {
        toast.success("Added to favorites");
      }
    } catch (e) {
      toast.error(e?.data?.message || e.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Card
      raised={hovering}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="card"
    >
      <Box className="cardHeader">
        <Typography className="pop">{`${vehicleData.tags}`}</Typography>

        <IconButton
          className="optionBtn"
          aria-label="settings"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Popover
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {vehicleData.id === userInfo.email && (
            <>
              <MenuItem onClick={deletePost} disableRipple sx={{ gap: "10px" }}>
                <DeleteIcon />
                Delete
              </MenuItem>
              <Divider />
            </>
          )}
          <MenuItem onClick={handleClose} disableRipple sx={{ gap: "10px" }}>
            <ShareIcon />
            Share
          </MenuItem>
        </Popover>
      </Box>
      <Box className="picture-holder" onClick={onClick}>
        <img
          height="200"
          src={
            vehicleData.images ||
            `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRYpno8CE-P69WpuE2G9lZMh0Afg3ZehDWsAlnid2XotX7ej8crpmdl25PXDR_Jq0Fd04&usqp=CAU`
          }
          alt="car"
        />
      </Box>
      <Box className="spec1">
        <Typography className="spec-price">{`Rs ${vehicleData.price}.00/-`}</Typography>
        <Box className="car-color-wrapper">
          <Typography className="car-color-label">Color</Typography>
          <div
            className="car-color"
            style={{
              backgroundColor: vehicleData.originalColor,
              border:
                vehicleData.originalColor === "white" && `1px solid black`,
            }}
          />
        </Box>
      </Box>
      <Box className="spec2">
        <div className="car-make">
          {vehicleData.make} {vehicleData.model} {vehicleData.year}
        </div>
        <div className="car-seller">
          {`Seller: ${vehicleData.id}`}

          <FavoriteIcon
            onClick={handleFavorites}
            sx={{
              ":hover": { color: "rgba(255,0,0,1)", cursor: "pointer" },
              color:
                userInfo.favorites.includes(vehicleData._id) &&
                "rgba(255,0,0,1)",
            }}
          />
        </div>
      </Box>
    </Card>
  );
};

export default DisplayCard;
