import { Express } from "express";
import { CoraController } from "../controllers/cora.controller";

export function registerCoraRoutes(app: Express) {
  const controller = new CoraController();

  app.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));
  app.post("/cora/token", controller.getToken.bind(controller));
}
