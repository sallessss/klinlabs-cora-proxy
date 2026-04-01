import { env } from "../config/env";
import { mtlsHttpClient } from "../config/httpClient";
import { buildCoraHeaders, CoraAuthContext } from "./coraHeaders";

export class BoletoRepository {
  async createInvoice(auth: CoraAuthContext, payload: unknown) {
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

  async listInvoices(auth: CoraAuthContext, query: unknown) {
    const response = await mtlsHttpClient.get(`${env.coraBaseUrl}/v2/invoices`, {
      headers: buildCoraHeaders(auth),
      params: query
    });

    return {
      status: response.status,
      data: response.data
    };
  }

  async getInvoice(auth: CoraAuthContext, invoiceId: string) {
    const response = await mtlsHttpClient.get(
      `${env.coraBaseUrl}/v2/invoices/${invoiceId}`,
      {
        headers: buildCoraHeaders(auth)
      }
    );

    return {
      status: response.status,
      data: response.data
    };
  }

  async cancelInvoice(
    auth: CoraAuthContext,
    invoiceId: string
  ) {
    const response = await mtlsHttpClient.delete(
      `${env.coraBaseUrl}/v2/invoices/${invoiceId}`,
      {
        headers: buildCoraHeaders(auth)
      }
    );

    return {
      status: response.status,
      data: response.data
    };
  }

  async listInvoiceNotifications(
    auth: CoraAuthContext,
    invoiceId: string,
    query: unknown
  ) {
    const response = await mtlsHttpClient.get(
      `${env.coraBaseUrl}/v2/invoices/${invoiceId}/notifications`,
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

  async cancelInvoiceNotification(
    auth: CoraAuthContext,
    invoiceId: string
  ) {
    const response = await mtlsHttpClient.delete(
      `${env.coraBaseUrl}/v2/invoices/${invoiceId}/notifications`,
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
