import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { generateBaseImage } from "../utils/generateBaseImage.js";
import Listing from "../models/listingModel.js";

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, photo } = req.body;
  const userPresent = await User.findOne({ email });
  if (userPresent) {
    res.status(400);
    throw new Error("User already exists");
  }
  let photoUrl;
  if (photo) {
    photoUrl = generateBaseImage(photo);
  }
  const user = await User.create({
    username,
    email,
    photo: photoUrl,
    favorites: [],
    password,
  });
  if (!user) {
    res.status(500);
    throw new Error("Failed to register user, Invalid user data");
  }
  await Listing.create({ _id: user.email, list: [] });
  let publicListings = await Listing.find({});
  publicListings = publicListings.map((item) => item.list).flat();
  res.status(201).json({
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      photo: user.photo,
      posts: [],
      favorites: [],
      token: generateToken(user._id),
    },
    publicListings,
  });
});

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const { list } = await Listing.findById(user.email);
    let publicListings = await Listing.find({});

    publicListings = publicListings.map((item) => item.list).flat();
    res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        photo: user.photo,
        posts: [...list],
        favorites: user.favorites,
        token: generateToken(user._id),
      },
      publicListings,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ user: req.user });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  const { list } = await Listing.findById(user.email);

  const { username, email, photo, previousPassword, newPassword, favId } =
    req.body;
  if (username) {
    user.username = username;
  }
  if (email) {
    user.email = email;
  }

  if (favId) {
    if (!user.favorites.includes(favId)) {
      user.favorites.push(favId);
    } else {
      user.favorites = user.favorites.filter((fav) => fav !== favId);
    }
  }

  if (photo) {
    user.photo = generateBaseImage(photo);
  }

  if (previousPassword && newPassword) {
    if (await user.matchPassword(previousPassword)) {
      user.password = await bcrypt.hash(newPassword, 10);
    } else {
      return res.status(400).json({ ok: false, message: "Wrong Password!" });
    }
  }

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { ...user },
    {
      returnDocument: "after",
      new: true,
    }
  );
  res.status(201).json({
    user: {
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      photo: updatedUser.photo,
      posts: [...list],
      favorites: updatedUser.favorites,
      token: generateToken(updatedUser._id),
    },
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = req.user;
  const status = await User.findByIdAndDelete(user._id);
  await Listing.findByIdAndDelete(user.email);
  if (!status) throw new Error("Error deleting profile!");
  res.status(200);
});

// @desc    Update user profile
// @route   POST /api/users/post
// @access  Private

const postListing = asyncHandler(async (req, res) => {
  const user = req.user;
  const post = req.body;
  if (!req.body.images) {
    post.images = `https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png`;
  }

  const { list } = await Listing.findById(user.email);
  list.push({ id: user.email, ...post });
  const updatedPosts = await Listing.findByIdAndUpdate(
    user.email,
    { list },
    {
      returnDocument: "after",
      new: true,
    }
  );
  let publicListings = await Listing.find({});
  publicListings = publicListings.map((item) => item.list).flat();
  res.status(201).json({
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      photo: user.photo,
      favorites: user.favorites || [],
      posts: updatedPosts.list,
      token: generateToken(user._id),
    },
    publicListings,
  });
});

// @desc    Delete user's post
// @route   POST /api/users/post
// @access  Private
const deleteListing = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  const user = await User.findById(req.user._id);
  let { list } = await Listing.findById(user.email);
  list = list.filter((post) => post._id.toString() !== _id);

  const updated = await Listing.findByIdAndUpdate(
    user.email,
    { list },
    { returnDocument: "after", new: true }
  );
  if (updated) {
    let publicListings = await Listing.find({});
    publicListings = publicListings.map((item) => item.list).flat();
    return res.status(201).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        photo: user.photo,
        posts: updated.list,
        favorites: user.favorites,
        token: generateToken(user._id),
      },
      publicListings,
    });
  }
  return res.status(400).json({ ok: false, message: "Error Deleting Post" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  postListing,
  deleteListing,
};
