import { MikroORM } from "@mikro-orm/core";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { __prod__ } from "./constants";
import microConf from "./mikro-orm.config";
import { HelloResolver } from "./resolvers/hello";

const main = async () => {
  const orm = await MikroORM.init(microConf);
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
  });
  // app.get("/", (_, response: Response) => {
  //   response.send("HELLo");
  // });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((error) => {
  console.error(error);
});
