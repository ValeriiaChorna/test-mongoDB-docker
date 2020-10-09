import express from "express";
import morgan from "morgan";
import path from "path";
import mongoose from "mongoose";
import { tweetsRouter } from "./tweets/tweets.router";

const DATABASE_CONNECTION = "mongodb://mongo/test-mongoDB-docker";
const PORT = 3000;

export class CrudServer {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddleware();
    await this.initDatabase();
    this.initRoutes();
    this.handleErrors();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddleware() {
    this.server.use(express.json());
    this.server.use(morgan("tiny"));
  }

  initRoutes() {
    this.server.use(express.static(path.join(__dirname, "../static")));
    this.server.use("/tweets", tweetsRouter);
  }

  handleErrors() {
    this.server.use((err, req, res, next) => {
      delete err.stack;
      return res.status(err.status || 500).send(`${err.name}: ${err.message}`);
    });
  }

  async initDatabase() {
    try {
      await mongoose.connect(DATABASE_CONNECTION, {});
      const db = mongoose.connection;
      console.log("Trying to connect to " + DATABASE_CONNECTION);
      db.once("open", console.log("Database connection successful"));
    } catch (err) {
      console.log("MongoDB connection error", err);
      process.exit(1);
    }
  }

  startListening() {
    this.server.listen(PORT, () => {
      console.log("Server started listening on port", PORT);
    });
  }
}
