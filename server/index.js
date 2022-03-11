const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")))

// ENV config
const dotenv = require("dotenv");
dotenv.config();

// DB config
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
})
.then(console.log("connected to Mongo DB"))
.catch((err)=>{console.log(err)});


//Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  }
})

const upload = multer({storage:storage})
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Fichier sauvegardé !")
})

//Routes:
const authRoute = require("./routes/auth");
app.use("/auth", authRoute);

const userRoute = require("./routes/users");
app.use("/users", userRoute);

const postRoute = require("./routes/posts");
app.use("/posts", postRoute);

const categoryRoute = require("./routes/categories");
app.use("/categories", categoryRoute);

//Server

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is runnin' on PORT: ${PORT}`)
})