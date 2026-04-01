import { env } from "../config/env";
import { mtlsHttpClient } from "../config/httpClient";
import { buildCoraHeaders, CoraAuthContext } from "./coraHeaders";

export class PixRepository {
  async createQrCode(auth: CoraAuthContext, payload: unknown) {
    const response = await mtlsHttpClient.post(
      `${env.coraBaseUrl}/v2/invoices`,
      payload,
      {
        headers: buildCoraHeaders(auth)
      }
    );

    return {
      status: response.status,
      data: response.data
    };
  }
}
