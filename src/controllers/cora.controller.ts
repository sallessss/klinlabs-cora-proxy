import { NextFunction, Request, Response } from "express";
import { CoraService } from "../services/cora.service";

export class CoraController {
  private readonly service = new CoraService();

  async getToken(_req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this.service.getAccessToken();
      res.status(200).json(token);
    } catch (error) {
      next(error);
    }
  }
}
