const express = require("express");
const chats = require("./data/data");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
dotenv.config();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/mernChatApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => {
    console.log(err);
  });

app.use("/api/auth", userRouter);

app.listen(process.env.PORT, () => {
  console.log("Started server");
});
