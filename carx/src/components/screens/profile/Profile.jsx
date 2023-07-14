import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { Box, Button } from "@mui/material";
import { toast } from "react-toastify";
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import KeyIcon from "@mui/icons-material/KeyOutlined";
import PersonRemove from "@mui/icons-material/PersonRemoveOutlined";
import { logOut, setCredentials } from "../../../redux/slices/authSlice";
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../../redux/slices/usersApiSlice";
import editBtn from "../../../assets/pencil.png";
import Navbar from "../../common/navbar/Navbar";
import Loader from "../../common/loader/Loader";
import "./profile.css";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [cookie, setCookie] = useCookies(["jwt"]);
  const hiddenInput = useRef(null);
  const [updatedInfo, setUpdatedInfo] = useState({
    username: userInfo.username,
    email: userInfo.email,
    photo: null,
  });
  const [password, setPassword] = useState({
    previousPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [tab, setTab] = useState(0);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    hiddenInput.current.click();
  };

  const handleFile = (e) => {
    const photo = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUpdatedInfo((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(photo);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const { previousPassword, newPassword, confirmPassword } = password;
    if (!previousPassword || !newPassword || !confirmPassword) {
      return toast.warn("Please make necessary changes before saving.");
    }
    if (newPassword !== confirmPassword) {
      return toast.warn("Password Mismatch.");
    }
    try {
      formData.append("previousPassword", previousPassword);
      formData.append("newPassword", newPassword);
      const res = await updateUser({
        formData,
        cookie,
      }).unwrap();
      const user = res.user;
      setCookie("jwt", user.token);
      dispatch(setCredentials(user));
      toast.success("Password Changed Successfully!");
    } catch (e) {
      toast.error(e?.data?.message || e.message);
    }
  };
  const handleBasicInfoChange = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const { username, email, photo } = updatedInfo;
    if (
      (updatedInfo.photo === null &&
        username === userInfo.username &&
        email === userInfo.email) ||
      (!username && !email)
    )
      return toast.warn("Please make necessary changes before saving.");
    try {
      if (username) {
        formData.append("username", username);
      }
      if (email) {
        formData.append("email", email);
      }
      if (photo) {
        formData.append("photo", photo);
      }
      const res = await updateUser({
        formData,
        cookie,
      }).unwrap();
      const user = res.user;
      setCookie("jwt", user.token);
      dispatch(setCredentials(user));
      toast.success("Profile Updated Successfully!");
    } catch (e) {
      toast.error(e?.data?.message || e.message);
    }
  };

  const handleDeleteAcc = async () => {
    try {
      deleteUser({ cookie }).unwrap();
      dispatch(logOut());
      toast.success("Profile Deleted Successfully!");
    } catch (e) {
      toast.error(e?.data?.message || e.message);
    }
  };

  const handleBasicInfoInput = (e) => {
    setUpdatedInfo((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handlePasswordInput = (e) => {
    setPassword((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };
  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          className="profile-wrapper"
          sx={{
            flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },
            alignItems: { xs: "center" },
          }}
        >
          <Box
            sx={{
              height: { xs: "auto", sm: "89vh", md: "89vh", lg: "89vh" },
              backgroundColor: "#FFF",
            }}
          >
            <div className="profile-left-top">
              {updatedInfo.photo ? (
                <img
                  alt={userInfo.username}
                  src={updatedInfo.photo}
                  className="profile-image"
                />
              ) : (
                <img
                  alt={userInfo.username}
                  src={
                    (userInfo.photo.contentType &&
                      `${userInfo.photo.contentType}${userInfo.photo.data}`) ||
                    `https://img.freepik.com/free-icon/user_318-180888.jpg`
                  }
                  className="profile-image"
                />
              )}

              <button
                type="button"
                className="edit-profile-image-btn"
                onClick={handleImageChange}
              >
                <img alt="edit" src={editBtn} className="edit-btn" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={hiddenInput}
                style={{ display: "none" }}
                onChange={handleFile}
              />
              <div className="profile-info">
                <div className="username">{userInfo.username}</div>
                <div className="email">{userInfo.email}</div>
              </div>
            </div>
            <div className="profile-left-bottom">
              <div
                className={tab === 0 ? `block-wrapper-active` : `block-wrapper`}
                onClick={() => setTab(0)}
              >
                <div className="info-block">
                  <PersonIcon />
                  <p>Basic Info</p>
                </div>
              </div>
              <div
                className={tab === 1 ? `block-wrapper-active` : `block-wrapper`}
                onClick={() => setTab(1)}
              >
                <div className="info-block">
                  <KeyIcon />
                  <p>Change Password</p>
                </div>
              </div>
              <div className="block-wrapper-delete" onClick={handleDeleteAcc}>
                <div className="info-block">
                  <PersonRemove />
                  <p>Delete Account</p>
                </div>
              </div>
            </div>
          </Box>
          <Box
            sx={{
              backgroundColor: "#FFF",
              height: { xs: "auto", sm: "89vh", md: "89vh", lg: "89vh" },
              width: { xs: "auto", sm: "60%", md: "60%", lg: "60%" },
              padding: { xs: 3, sm: 0, md: 0, lg: 0 },
            }}
          >
            {tab === 0 ? (
              <form onSubmit={handleBasicInfoChange} className="profile-form">
                <h2>Basic Info</h2>
                <label htmlFor="username">Username</label>
                <input
                  value={updatedInfo.username}
                  type="text"
                  id="username"
                  onChange={handleBasicInfoInput}
                />
                <label htmlFor="email">Email</label>
                <input
                  value={updatedInfo.email}
                  type="email"
                  id="email"
                  onChange={handleBasicInfoInput}
                  disabled
                />
                <Button type="submit" className="editProfileBtn">
                  Save
                </Button>
              </form>
            ) : (
              <form onSubmit={handlePasswordChange} className="profile-form">
                <h2>Change Password</h2>
                <label htmlFor="previousPassword">Previous Password</label>
                <input
                  value={password.previousPassword}
                  type="password"
                  id="previousPassword"
                  onChange={handlePasswordInput}
                />
                <label htmlFor="newPassword">New Password</label>
                <input
                  value={password.newPassword}
                  type="password"
                  id="newPassword"
                  onChange={handlePasswordInput}
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  value={password.confirmPassword}
                  type="password"
                  id="confirmPassword"
                  onChange={handlePasswordInput}
                />
                <Button type="submit" className="editProfileBtn">
                  Save
                </Button>
              </form>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Profile;
