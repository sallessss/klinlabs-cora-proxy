import { Express } from "express";
import { PixController } from "../controllers/pix.controller";
import { coraAuthMiddleware } from "../middlewares/coraAuth";

export function registerPixRoutes(app: Express) {
  const controller = new PixController();

  app.post(
    "/cora/pix/qr-code",
    coraAuthMiddleware,
    controller.createQrCode.bind(controller)
  );
}
