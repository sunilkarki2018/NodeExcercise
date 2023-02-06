require("dotenv").config();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT;

// Parse requests of content-type - application/json
app.use(express.json());

// Include UserModel to communicate with MongoDB
const User = require("./models/user");

// Connect your app to MongoDB and get connection, fix deprecation warnings
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Database successfully connected!"));

// use error handler middleware
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

// use auth middleware
const auth = require("./middlewares/auth");

// use users route
const usersRouter = require("./controllers/users");
app.use("/api/users", usersRouter);

// use login route
const loginRouter = require("./controllers/login");
app.use("/api/login", loginRouter);

// use data route
const dataRouter = require("./controllers/data");
app.use("/api/data", auth, dataRouter);

// listen port
app.listen(port, () => {
  console.log(`Example JWT app listening on port ${process.env.PORT}`);
});
