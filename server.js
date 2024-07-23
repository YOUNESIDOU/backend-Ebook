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

const port = process.env.port || 8000;
app.listen(port, () => {
  console.log(`it's working `);
});
