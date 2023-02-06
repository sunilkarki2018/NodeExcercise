require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const connectMongoDB = require("./db/mongodb");

// json parser middleware
// parse incoming requests with JSON, assign it to requests body
app.use(express.json());

//let { users } = require("./data");

// logger is executed every time the app receives a request
const logger = require("./middleware/logger");
app.use(logger);

// use users router
const usersRouter = require("./routes/users");
app.use("/api/users", usersRouter);

// connect mongodb and start server
const start = async () => {
  try {
    await connectMongoDB(process.env.MONGODB);
    app.listen(process.env.PORT, () =>
      console.log(`Server listening on port ${process.env.PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

// start connection to mongodb and start server
start();
/*
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
*/
