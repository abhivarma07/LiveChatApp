import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
import routes from "./routes/index.routes";
import { initializeAppRoutes } from "./routes/app.routes";
import { errorNames, getErrorCode } from "./utils/errors/index.errors";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();

const port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

// set cors
app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

// const connectionString = process.env.MONGO_DB_CONNECTION;
const connectionString = process.env.MONGO_DB_CONNECTION;

const connectToDB = async () => {
  try {
    await mongoose.connect(connectionString, {});

    console.log("Connected to database successfully");
  }catch (err) {
    console.log(err);
    const { message } = getErrorCode(errorNames.FAILED_TO_CONNECT_DATABASE);
    return new Error(message);
  }
};

// app.listen(port, async () => {
//   console.log(`App  listening at port ${port}`);

//   await connectToDB();

//   await initializeAppRoutes(); // initializes app routes using apollo server
//   app.use("/api", routes);
// });

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "https://euphonious-halva-2a0131.netlify.app/",
  },
});

let activeUsers: { userId: string; socketId: string }[] = [];

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  // add new user
  socket.on("new-user-add", (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
    console.log("User Connected", activeUsers);
    io.emit("get-users", activeUsers);
  });

  socket.on("create-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("CREATE MESSAGE ACTIVATED");
    console.log("Sending from socket to :", receiverId);
    console.log("Data: ", data);
    if (user) {
      console.log("sending to user");
      io.to(user.socketId).emit("recieve-created-chat", data);
    }
  });

  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId === receiverId);
    console.log("Sending from socket to :", receiverId);
    console.log("Data: ", data);
    if (user) {
      console.log("sending to user");
      io.to(user.socketId).emit("recieve-message", data);
    }
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);

    io.emit("get-users", activeUsers);
  });
});

httpServer.listen(port, async () => {
  console.log(`App  listening at port ${port}`);

  await connectToDB();

  await initializeAppRoutes(); // initializes app routes using apollo server
  app.use("/api", routes);
});
