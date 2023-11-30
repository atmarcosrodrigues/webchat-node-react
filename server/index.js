const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();

const {
  mongooseConnect,
} = require("./services/databaseService/databaseConnect");
const { socketConnect } = require("./services/socketService");
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongooseConnect();

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`WebChat Server started on ${process.env.PORT}`)
);
socketConnect(server);
module.exports = app;
