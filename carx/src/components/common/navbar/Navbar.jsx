import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
  Typography,
  Menu,
  Container,
  Tooltip,
  MenuItem,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../../assets/logo.png";
import "./navbar.css";

function Navbar() {
  const { userInfo } = useSelector((state) => state.auth);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const settings = [
    { name: `${userInfo.username}'s profile`, endpoint: "/profile" },
    { name: "Logout", endpoint: "/logout" },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#222" }}>
      <Container className="navbar">
        <Toolbar disableGutters className="navbar">
          <Tooltip title="Home">
            <img
              src={logo}
              alt="logo"
              className="logo"
              onClick={() => navigate("/")}
            />
          </Tooltip>

          <Box className="center-bar">
            <Box
              className="searchbar"
              sx={{
                display: { xs: "none", sm: "flex", md: "flex", lg: "flex" },
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <InputBase
                className="searchbar-input"
                placeholder="Find cars, models, etc."
              />
              <SearchIcon className="searchbar-icon" />
            </Box>

            <Box
              sx={{
                display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
                alignItems: "center",
                justifyContent: "space-evenly",
                gap: 2,
                marginRight: "auto",
              }}
            >
              <Tooltip title="Buy Cars" to="/">
                <Link className="link">
                  <Typography
                    sx={{
                      color: pathname === "/" ? "tomato" : "#FFF",
                    }}
                  >
                    Buy
                  </Typography>
                </Link>
              </Tooltip>
              <Tooltip title="Sell Cars">
                <Link className="link" to="/inventory">
                  <Typography
                    sx={{
                      color: pathname === "/inventory" ? "tomato" : "#FFF",
                    }}
                  >
                    Sell
                  </Typography>
                </Link>
              </Tooltip>
              <Tooltip title="Favorites">
                <Link className="link" to="/favorites">
                  <FavoriteIcon
                    sx={{
                      color: pathname === "/favorites" ? "tomato" : "#FFF",
                    }}
                  />
                </Link>
              </Tooltip>
            </Box>
          </Box>

          <Box className="navigation">
            <Tooltip title="Open settings">
              <Button className="settings" onClick={handleOpenUserMenu}>
                {userInfo.username}
              </Button>
            </Tooltip>
            <Menu
              sx={{ mt: "40px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {
                <Box
                  sx={{
                    display: {
                      xs: "block",
                      sm: "block",
                      md: "none",
                      lg: "none",
                    },
                  }}
                >
                  <MenuItem onClick={() => navigate("/inventory")}>
                    <Typography textAlign="center">Sell</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/")}>
                    <Typography textAlign="center">Buy</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/favorites")}>
                    <Typography textAlign="center">Favorites</Typography>
                  </MenuItem>
                </Box>
              }
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={() => navigate(setting.endpoint)}
                >
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
