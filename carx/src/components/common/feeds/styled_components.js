import { styled } from "@mui/material";

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open, drawerwidth }) => ({
  flexGrow: 1,
  display: "flex",
  width: open ? `calc(96% - ${drawerwidth}px)` : "96%",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerwidth,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export { Main, DrawerHeader };
