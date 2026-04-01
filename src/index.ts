import { createApp } from "./app";

const app = createApp();
const port = Number(process.env.PORT);

app.listen(port, () => {
  console.log(`KlinLabs - Proxy CORA iniciado com sucesso!`);
});
