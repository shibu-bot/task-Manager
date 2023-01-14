const express = require("express");
const tasks = require("./routes/task");
const app = express();
const connectDB = require("./db/conn");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//middleware
app.use(express.static("./public"));
app.use(express.json());

// //route
// app.get("/hello", (req, res) => {
//   res.send("HELLO FROM THE SERVER");
// });

//route
app.use("/api/v1/tasks", tasks);

// middlewARE
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.mongoURI);
    app.listen(
      port,
      console.log(`Listening at port ${port} and DB is connected`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
