import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";

export function apiKeyAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {

  if (!env.apiToken) {
    return res.status(500).json({
      error: "Ocorreu um erro no lado do servidor :("
    });
  }

  const token = req.header("x-api-token");

  if (!token || token !== env.apiToken) {
    return res.status(401).json({
      error: "Voce nao tem permissão para utilizar essa API"
    });
  }

  return next();
}
