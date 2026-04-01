import axios from "axios";
import fs from "fs";
import https from "https";
import { env } from "./env";

function loadCert(filePath: string): Buffer | undefined {
  if (!filePath) {
    return undefined;
  }

  return fs.readFileSync(filePath);
}

export const mtlsHttpClient = axios.create({
  httpsAgent: new https.Agent({
    cert: loadCert(env.mtlsCertPath),
    key: loadCert(env.mtlsKeyPath),
    keepAlive: true
  })
});
