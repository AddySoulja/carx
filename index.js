dotEnv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotEnv from "dotenv";
import passport from "passport";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";
import { configPass } from "./configs/passport.js";
import userRoutes from "./routes/userRoutes.js";
import connectDb from "./configs/db.js";

const app = express();
connectDb();
const pass = configPass(passport);
const port = process.env.PORT || 80;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(pass.initialize());

app.use("/api/users", userRoutes);
// app.use("/api/inventory", inventoryRoutes);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.use(express.static(path.join(__dirname, "sellmycar/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "sellmycar/build", "index.html"));
// });

app.use(errorHandler);
app.use(notFoundHandler);
app.listen(port, () => console.log(`Server started...: ${port}`));

export default app;
