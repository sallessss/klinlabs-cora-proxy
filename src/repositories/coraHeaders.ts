import { randomUUID } from "crypto";

export interface CoraAuthContext {
  accessToken: string;
  tokenType?: string;
  idempotencyKey?: string;
}

export function buildCoraHeaders(auth: CoraAuthContext) {
  const tokenType = auth.tokenType || "Bearer";

  return {
    Authorization: `${tokenType} ${auth.accessToken}`,
    "Idempotency-Key": auth.idempotencyKey || randomUUID(),
    Accept: "application/json",
    "Content-Type": "application/json"
  };
}
