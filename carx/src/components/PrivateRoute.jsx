import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [cookie, setCookie] = useCookies(["jwt"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      return navigate("/login");
    }
  }, [userInfo, navigate]);

  return userInfo && <Outlet />;
};

export default PrivateRoute;
