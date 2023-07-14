import express from "express";
import {
  createListing,
  populateListings,
} from "../controllers/inventoryController.js";

const app = express.Router();

app.get("/", populateListings);
app.route("/edit").post(createListing);
// .get(protectMiddleware, readPost)
// .put(protectMiddleware, updatePost)
// .delete(protectMiddleware, deletePost);
export default app;
