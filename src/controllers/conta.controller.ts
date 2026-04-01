import { NextFunction, Request, Response } from "express";
import { CoraAuthContext } from "../repositories/coraHeaders";
import { ContaService } from "../services/conta.service";

export class ContaController {
  private readonly service = new ContaService();

  private getAuth(res: Response) {
    const auth = res.locals.coraAuth as CoraAuthContext | undefined;

    if (!auth?.accessToken) {
      throw new Error("Acesso negado");
    }

    return auth;
  }

  async getAccount(_req: Request, res: Response, next: NextFunction) {
    try {
      const auth = this.getAuth(res);
      const result = await this.service.getAccount(auth);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async getBalance(_req: Request, res: Response, next: NextFunction) {
    try {
      const auth = this.getAuth(res);
      const result = await this.service.getBalance(auth);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async getStatement(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = this.getAuth(res);
      const result = await this.service.getStatement(auth, req.query);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }
}
