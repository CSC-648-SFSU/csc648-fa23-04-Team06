const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const http = require('http');
const socketIo = require('socket.io');
const Message = require('./models/Message');
const authController = require("./controllers/authController");
const blogController = require("./controllers/blogController");
const userController = require("./controllers/userController");
const friendsController = require('./controllers/friendsController');
const subscribeRoutes = require("./routes/subscribeRoutes");
const eventRoutes = require("./routes/eventRoutes");

const multer = require("multer");
const app = express();

// connect db
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, () =>
  console.log("Connected to DestiGo Database [MongoDB]")
);

// routes
app.use("/images", express.static("public/images"));

app.get("/", (req, res) => {
  res.json("If you're seeing this message, it means the DestiGo API is running.");
});


// CORS Rules (DO NOT TOUCH)
const allowedOrigins = [
  'http://localhost:3000', // CORS Rule for Development URL
  'https://destigo.vercel.app'  // CORS Rule for Production URL
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

const server = http.createServer(app);
const io = socketIo(server, {
  cors: corsOptions
});

let users = {};

io.on('connection', (socket) => {
  // When a user logs in, store their user ID and socket ID
  socket.on('login', (userId) => {
    users[userId] = socket.id;
  });

  // When a new message is received
  socket.on('new message', (data) => {
    // Save the message to the database
    const messageModel = new Message(data);
    messageModel.save((err) => {
      if (err) {
        console.error('Error saving message:', err);
        return;
      }

      users[data.sender] = socket.id; // Store the sender's socket ID
        
      // Emit the new message to the recipient
      const recipientSocketId = users[data.recipient];
      if (recipientSocketId) {
        io.to(recipientSocketId).emit('new message', data);
      }
    });
  });

  // When a user logs out, remove their user ID and socket ID
  socket.on('logout', (userId) => {
    delete users[userId];
  });
});

const messageController = require("./controllers/messageController")(io);

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authController);
app.use("/blog", blogController);
app.use("/api/messages", messageController);
app.use("/api/users", userController);
app.use('/api/friends', friendsController);
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
// app.listen(process.env.PORT, () =>
//   console.log("Server has been started successfully")
// );

server.listen(process.env.PORT, () =>
  console.log("Server has been started successfully")

);
