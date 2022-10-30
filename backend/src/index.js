const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

const User = require("./models/User");
const Post = require("./models/Post");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}_${Date.now()}.jpg`);
  },
});
const upload = multer({ storage });

const app = express();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// User Endpoints
app.post("/find_register", async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password, // this should be hashed
    phone_number: req.body.phone_number,
    type: "user",
  });
  res.json(user);
});

app.post("/give_register", async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password, // this should be hashed
    phone_number: req.body.phone_number,
    type: "restaurant",
    business_name: req.body.business_name,
    business_address: req.body.business_address,
  });
  res.json(user);
});

app.post("/login", async (req, res) => {
  const users = await User.find({
    email: req.body.email,
    password: req.body.password,
  });
  if (users.length > 0) {
    res.json(users[0]);
    return;
  }
  res.sendStatus(401);
});

app.post("/profile", async (req, res) => {
  const user = await User.findById(req.body.user_id);
  const posts = await Post.find({ user: user._id }).populate("user");
  res.json({ user, posts });
});

// Post Endpoints
app.post("/post_create", upload.single("image"), async (req, res) => {
  const post = await Post.create({
    user: await User.findById(req.body.user_id),
    title: req.body.title,
    description: req.body.description,
    servings: req.body.servings,
    image: req.file.filename,
  });
  res.json(post);
});

app.post("/post_status", async (req, res) => {
  const post = await Post.findById(req.body.post_id);
  await Post.findByIdAndUpdate(req.body.post_id, {
    status: post.status === "pending" ? "completed" : "pending",
  });
  res.json(post);
});

app.get("/find", async (req, res) => {
  const posts = await Post.find({ status: "pending" }).populate("user");
  res.json(posts);
});

app.listen(8000, () => {
  console.log("Server started on port 8000");

  mongoose
    .connect("mongodb://localhost:27017/appetite")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));
});
