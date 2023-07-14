import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../../redux/slices/authSlice";
import { useLogoutMutation } from "../../../redux/slices/usersApiSlice";
import Loader from "../../common/loader/Loader";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();
  const handleLogout = useCallback(async () => {
    try {
      // await logout().unwrap();
      dispatch(logOut());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  useEffect(() => {
    handleLogout();
    navigate("/login");
  }, [handleLogout, navigate]);
  return isLoading && <Loader />;
};

export default Logout;
