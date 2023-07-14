import express from "express";
import multer from "multer";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  postListing,
  deleteListing,
  deleteUser,
} from "../controllers/userController.js";
import authenticate from "../middleware/authMiddleware.js";

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post("/", upload.single("photo"), registerUser);
router.post("/auth", upload.fields(["email", "password"]), authUser);
router.post("/logout", authenticate, logoutUser);

router
  .route("/profile")
  .get(authenticate, getUserProfile)
  .put(
    authenticate,
    upload.fields([
      "username",
      "email",
      "photo",
      "previousPassword",
      "newPassword",
      "favId",
    ]),
    updateUserProfile
  );
router.post("/delete", authenticate, deleteUser);
router
  .route("/post")
  .post(authenticate, upload.array("images"), postListing)
  .put(authenticate, upload.fields(["_id"]), deleteListing);

export default router;
