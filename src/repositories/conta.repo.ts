import { env } from "../config/env";
import { mtlsHttpClient } from "../config/httpClient";
import { buildCoraHeaders, CoraAuthContext } from "./coraHeaders";

export class ContaRepository {
  async getAccount(auth: CoraAuthContext) {
    const response = await mtlsHttpClient.get(
      `${env.coraBaseUrl}/third-party/account/`,
      {
        headers: buildCoraHeaders(auth)
      }
    );

    return {
      status: response.status,
      data: response.data
    };
  }

  async getBalance(auth: CoraAuthContext) {
    const response = await mtlsHttpClient.get(
      `${env.coraBaseUrl}/third-party/account/balance`,
      {
        headers: buildCoraHeaders(auth)
      }
    );

    return {
      status: response.status,
      data: response.data
    };
  }

  async getStatement(auth: CoraAuthContext, query: unknown) {
    const response = await mtlsHttpClient.get(
      `${env.coraBaseUrl}/bank-statement/statement`,
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
}
