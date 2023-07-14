import mongoose, { mongo } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    username: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    photo: {
      data: { type: Buffer },
      contentType: { type: String },
    },
    password: { type: String, require: true },
    favorites: { type: Array },
  },
  { collection: "Users" },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, 10, (error, hash) => {
    if (error) {
      return next(error);
    }
    this.password = hash;
    next();
  });
});

userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
