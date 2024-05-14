// Modules Imports
import express, { Request, Response } from "express";
import userRoutes from "../src/infra/routes/user.routes";
import dotenv from "dotenv";

// Dotenv Config
import cors from "cors";
dotenv.config();

class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.connection();
    this.middlewares();
    this.routes();
  }

  async connection() {}

  middlewares() {
    this.server.use(
      cors({ credentials: true, origin: process.env.ORIGIN_URL }),
    );
  }

  routes() {
    // Health Check
    this.server.get(
      "/api/delivery/healthcheck",
      (request: Request, response: Response) => {
        return response.status(200).json({ Ok: true });
      },
    );

    // User
    this.server.use("/api/delivery/users", userRoutes);
  }
}

const app = new App().server;
export default app;
