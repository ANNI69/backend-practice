import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express, { urlencoded } from "express";
import connectToDB from "./DB/index.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());

connectToDB()
  .then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.log("Error: ", error.message);
  });
