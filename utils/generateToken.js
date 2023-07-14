import jwt from "jsonwebtoken";

// const generateToken = (res, userId) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: "15m",
//   });
//   res.cookie("jwt", token, {
//     httpOnly: true,
//     secure: false,
//     sameSite: "Strict",
//     maxAge: 15 * 60 * 1000,
//   });
// };

const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });

export default generateToken;
