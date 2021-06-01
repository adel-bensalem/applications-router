import "./config";
import express from "express";
import { MongoClient } from "mongodb";
import { createCore } from "./core/main";
import { createPresenter } from "./libs/presenter";
import { createRepository } from "./libs/repository";
import { createProxy } from "./libs/proxy";
import { createSubDomainProvider } from "./libs/subDomainProvider";

const app = express();
const port = process.env.PORT;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

const mongoClient = new MongoClient(
  `mongodb://${dbUser}:${dbPassword}@${dbHost}/${dbName}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const listenToExit = (cleanUp: () => void) => {
  process.on("exit", cleanUp);
  process.on("SIGINT", cleanUp);
  process.on("SIGUSR1", cleanUp);
  process.on("SIGUSR2", cleanUp);
  process.on("uncaughtException", cleanUp);
};

mongoClient.connect().then(() => {
  app.use(express.json());
  app.use((req, res) => {
    const core = createCore({
      repository: createRepository(mongoClient.db(dbName)),
      presenter: createPresenter(),
      proxy: createProxy(req, res),
    });
    const domainName = createSubDomainProvider(req).provideSubDomain();

    core.routeApplication(domainName);
  });

  const server = app.listen(port, () =>
    console.log(`App listening on port ${port}`)
  );

  listenToExit(() => {
    server.close();
    mongoClient.close(true);
  });
});
