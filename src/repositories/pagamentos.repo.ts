import { env } from "../config/env";
import { mtlsHttpClient } from "../config/httpClient";
import { buildCoraHeaders, CoraAuthContext } from "./coraHeaders";

export class PagamentosRepository {
  async initiatePayment(auth: CoraAuthContext, payload: unknown) {
    const response = await mtlsHttpClient.post(
      `${env.coraBaseUrl}/payments/initiate`,
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

  async listPayments(auth: CoraAuthContext, query: unknown) {
    const response = await mtlsHttpClient.get(`${env.coraBaseUrl}/payments/`, {
      headers: buildCoraHeaders(auth),
      params: query
    });

    return {
      status: response.status,
      data: response.data
    };
  }

  async cancelPayment(auth: CoraAuthContext, paymentId: string) {
    const response = await mtlsHttpClient.delete(
      `${env.coraBaseUrl}/payments/initiate/${paymentId}`,
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
