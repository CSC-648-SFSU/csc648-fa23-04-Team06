const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const authController = require("./controllers/authController");
const blogController = require("./controllers/blogController");
const messageController = require("./controllers/messageController");
const subscribeRoutes = require("./routes/subscribeRoutes");
const eventRoutes = require("./routes/eventRoutes");


const multer = require("multer");
const app = express();

// connect db
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, () =>
  console.log("MongoDB has been started successfully")
);

// routes
app.use("/images", express.static("public/images"));

app.get("/", (req, res) => {
  res.json("If you're seeing this message, it means the DestiGo API is running.");
});


// cors 
const allowedOrigins = [
  'http://localhost:3000', // CORS Rule for Development URL
  'https://destigo-app-client-frontend.vercel.app'  // CORS Rule for Production URL
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authController);
app.use("/blog", blogController);
app.use("/api/messages", messageController);
app.use('/api', subscribeRoutes);
app.use('/api', eventRoutes);


// multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.filename);
  },
});

const upload = multer({
  storage: storage,
});

app.post("/upload", upload.single("image"), async (req, res) => {
  return res.status(200).json({ msg: "Successfully uploaded" });
});

// connect server
app.listen(process.env.PORT, () =>
  console.log("Server has been started successfully")
);
