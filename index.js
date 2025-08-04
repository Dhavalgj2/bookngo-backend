require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const attendanceRoute = require("./src/routes/attendance");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/auth");
const adminRoutes = require("./src/routes/admin");

const PORT = 3000;

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://ngcevent.netlify.app",
    credentials: true,
  })
);

app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: true, // ← add comma here
      sameSite: "None",
    },
  })
);

app.use("/", attendanceRoute);
app.use("/", authRoutes);
app.use("/", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
