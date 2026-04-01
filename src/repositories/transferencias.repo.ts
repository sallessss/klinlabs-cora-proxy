import { env } from "../config/env";
import { mtlsHttpClient } from "../config/httpClient";
import { buildCoraHeaders, CoraAuthContext } from "./coraHeaders";

export class TransferenciasRepository {
  async initiateTransfer(auth: CoraAuthContext, payload: unknown) {
    const response = await mtlsHttpClient.post(
      `${env.coraBaseUrl}/transfers/initiate`,
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

  async listTransfers(auth: CoraAuthContext, query: unknown) {
    const response = await mtlsHttpClient.get(
      `${env.coraBaseUrl}/transfer/third-party/transfers/`,
      {
        headers: buildCoraHeaders(auth),
        params: query
      }
    );

    return {
      status: response.status,
      data: response.data
    };
  }

  async listBanks(auth: CoraAuthContext) {
    const response = await mtlsHttpClient.get(`${env.coraBaseUrl}/banks`, {
      headers: buildCoraHeaders(auth)
    });

    return {
      status: response.status,
      data: response.data
    };
  }
}
