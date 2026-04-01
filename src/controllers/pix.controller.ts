import { NextFunction, Request, Response } from "express";
import { CoraAuthContext } from "../repositories/coraHeaders";
import { PixService } from "../services/pix.service";

export class PixController {
  private readonly service = new PixService();

  private getAuth(res: Response) {
    const auth = res.locals.coraAuth as CoraAuthContext | undefined;

    if (!auth?.accessToken) {
      throw new Error("Acesso negado");
    }

    return auth;
  }

  async createQrCode(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = this.getAuth(res);
      const result = await this.service.createQrCode(auth, req.body);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }
}
