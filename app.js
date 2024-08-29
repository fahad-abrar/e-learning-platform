import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./router/index.js";
import databaseConnection from "./database/database.js";
import errerMiddleware from "./errorHandler/errorMiddleware.js";

dotenv.config();
const app = express();

// middlewere
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: "http://localhost/3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

// router
app.use("/api", router);

// database
databaseConnection();

// error handler
app.use(errerMiddleware);
app.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} is not found`);
  return err;
});

app.listen(process.env.PORT, () => {
  console.log("app is runing ...");
});

// handle the error
//app.use(errerMiddleware);
