import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import Dashboard from "./components/screens/dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/screens/user/Register";
import Login from "./components/screens/user/Login";
import store from "./redux/store";
import Logout from "./components/screens/user/Logout";
import Inventory from "./components/screens/inventory/Inventory";
import Profile from "./components/screens/profile/Profile";
import Checkout from "./components/screens/checkout/Checkout";
import Favorites from "./components/screens/favorites/Favorites";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/signup" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/logout" element={<Logout />} />
      </Route>
    </Route>
  )
);

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
