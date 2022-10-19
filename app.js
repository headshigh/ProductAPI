require("dotenv").config();
//async error
require("express-async-errors");
const express = require("express");
const app = express();
app.use(express.json());
const notFoundMiddleWare = require("./middleware/not-found");
const errorMiddleWare = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");
// app.use(notFoundMiddleWare);
app.use(errorMiddleWare);
app.use("/api/v1/products", productsRouter);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(5000, () => console.log(`Server is listening on port 5000`));
  } catch (err) {
    console.log(err);
  }
};
console.log("04 Store API");
start();
