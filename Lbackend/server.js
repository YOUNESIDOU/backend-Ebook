require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const mongoose = require("mongoose");
const url =
  "mongodb+srv://bacidoulhiane:rhdcdrmEYCvKe5qD@clusterodc.v25fvfc.mongodb.net/?retryWrites=true&w=majority&appName=ClusterODC";
mongoose
  .connect(url, {})
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use(cors({ credentials: true, origin: process.env.LfrontendPort }));

app.set("trust proxy", 1);
app.use((req, res, next) => {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Methods", "GET,PATCH,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization,x-auth-token, Content-Type, X-Requested-With, Set-Cookie"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", process.env.LfrontendPort);
    return res.status(200).end();
  }

  return next();
});

app.get("/test", (req, res) => {
  res.json({ message: "This is a test route for Team Younes" });
});

const port = process.env.port || 8000;
app.listen(port, () => {
  console.log(`it's working `);
});
