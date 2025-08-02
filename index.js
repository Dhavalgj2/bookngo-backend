const dotenv = require("dotenv");
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config();
}

const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const attendanceRoute = require("./src/routes/attendance");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/auth");
const adminRoutes = require("./src/routes/admin");

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: FRONTEND_URL,
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
      secure: false, // ❗set to true in production with HTTPS
      sameSite: "Lax",
    },
  })
);

app.use("/", attendanceRoute);
app.use("/", authRoutes);
app.use("/", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
