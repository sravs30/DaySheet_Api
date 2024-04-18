import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import adminRoute from "./routes/admin.js";
import usersRoute from "./routes/users.js";
import dayuserRoute from "./routes/dayUser.js";
import daysheetRoute from "./routes/daysheet.js";
import inventorywalaRoute from "./routes/inventorywala.js";
import inventorycakeRoute from "./routes/inventorycake.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import paymentsRoute from "./routes/payment.js";

const app = express();
dotenv.config();
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors({origin: true, credentials: true}))
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/admin", adminRoute);
app.use("/api/payments", paymentsRoute);
app.use("/api", daysheetRoute);
app.use("/api/dayusers", dayuserRoute);
app.use("/api/wala", inventorywalaRoute);
app.use("/api/cake", inventorycakeRoute);


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8801, () => {
  connect();
  console.log("Connected to backend.");
});
