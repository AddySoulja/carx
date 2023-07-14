import asyncHandler from "express-async-handler";

import Listing from "../models/listingModel.js";
import User from "../models/User.js";

const createListing = asyncHandler(async (req, res) => {
  console.log("Called...", req.user);
  const {
    id,
    make,
    model,
    year,
    contact,
    price,
    mileage,
    power,
    speed,
    images,
    title,
    description,
    driven,
    damages,
    originalColor,
    accidents,
    owners,
    registration,
  } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      const listing = await Listing.create({
        id,
        make,
        model,
        year: parseInt(year),
        contact: parseInt(contact),
        price,
        mileage,
        power,
        speed,
        images,
        title,
        description,
        driven,
        damages,
        originalColor,
        accidents,
        owners,
        registration,
      });
      listing.save();
      const data = await User.create({
        ...user,
        posts: [...user.posts, listing],
      });
      data.save();
      console.log("User after post: ", data);
      res.status(201).json({
        user: data,
      });
    }
  } catch (err) {
    res.status(501).json({ ok: false, status: "Internal server err.." });
  }
});

const updateListing = asyncHandler(async (req, res) => {
  // const {username, email, }
});
const deleteListing = asyncHandler(async (req, res) => {
  // const {username, email, }
});

const populateListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({});
  if (listings) {
    res.status(200).json({ publicListings: listings });
  } else {
    res.status(404);
    throw new Error("No posts found");
  }
});

export { populateListings, createListing };
