require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const multer = require('multer');




const mongoose = require("mongoose");
const url =
  "mongodb+srv://bacidoulhiane:rhdcdrmEYCvKe5qD@clusterodc.v25fvfc.mongodb.net/test?retryWrites=true&w=majority&appName=ClusterODC";
mongoose
  .connect(url, {})
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const upload = multer();

app.use(bodyParser.json());
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


//_______________

const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  imageDeleteToken: String,
});

const Book = mongoose.model('Book', bookSchema);

//Ajouter Book 
app.post('/api/books', async (req, res) => {
  try {
    const { title, description, image, imageDeleteToken } = req.body;
    const newBook = new Book({ title, description, image, imageDeleteToken });
    await newBook.save();
    res.status(201).send(newBook);
  } catch (error) {
    res.status(500).send({ error: 'Error adding book' });
  }
});

//________

// Afficher book 
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching books' });
  }
});
//________Delete 
app.delete("/api/books/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Invalid ID" });
  }

  const result = await Book.findByIdAndDelete({ _id: id });

  if (!result) {
    return res.status(404).json({ message: "Book not found" });
  }
  return res.status(200).json(result);
});


// //___________Update : 
// app.patch("/api/books/:id", async (req, res) => {
//   const { id } = req.params;
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res
//       .status(404)
//       .json({ error: "There is no such a thing in here go away" });
//   }

//   const ubook = await Book.findOneAndUpdate(
//     { _id: id },
//     {
//       ...req.body,
//     }
//   );
//   if (!ubook) {
//     res.status(404).json({ error: "there is no such a thing" });
//   }
//   res.status(200).json(ubook);
// });
//__



app.put("/api/books/:id", upload.single('image'), async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid book ID" });
  }

  const updateData = {
    ...req.body,
  };

  if (req.file) {
    updateData.image = req.file.buffer; // or process the file as needed
  }

  try {
    const ubook = await Book.findOneAndUpdate(
      { _id: id },
      updateData,
      { new: true }
    );

    if (!ubook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(ubook);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while updating the book" });
  }
});






const port = process.env.port || 8000;
app.listen(port, () => {
  console.log(`it's working `);
});
