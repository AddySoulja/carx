import mongoose from "mongoose";

const listingSchema = mongoose.Schema(
  {
    _id: { type: String, required: true },
    list: [
      {
        id: { type: String },
        make: { type: String },
        model: { type: String },
        year: { type: Number },
        contact: { type: Number },
        price: { type: Number },
        mileage: { type: Number },
        power: { type: Number },
        speed: { type: Number },
        images: { type: Array },
        title: { type: String },
        description: { type: String },
        driven: { type: Number },
        damages: { type: String },
        originalColor: { type: String },
        accidents: { type: Number },
        owners: { type: Number },
        registration: { type: String },
      },
    ],
  },
  {
    collection: "Listings",
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
