import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";
import { CoraService } from "../services/cora.service";

const service = new CoraService();

export async function coraAuthMiddleware(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = await service.getAccessToken();

    res.locals.coraAuth = {
      accessToken: token.access_token,
      tokenType: token.token_type || "Bearer",
      idempotencyKey: randomUUID()
    };

    next();
  } catch (error) {
    next(error);
  }
}
