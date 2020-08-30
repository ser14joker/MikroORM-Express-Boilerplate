import { MikroORM } from "@mikro-orm/core";
import path from "path";

import { __prod__ } from "./constants";
import { Post } from "./entities/Post";

const main = async () => {
  const orm = await MikroORM.init({
    migrations: {
      path: path.join(__dirname, "./migrations"), // path to the folder with migrations
      pattern: /^[\w-]+\d+\.ts$/, // regex pattern for the migration files
    },
    entities: [Post],
    dbName: "lireddit",
    user: "postgres",
    password: "admin",
    type: "postgresql",
    debug: !__prod__,
    port: 5432,
  });
  // await orm.getMigrator().createMigration();
  // await orm.getMigrator().up();
  const post = orm.em.create(Post, { title: "my second post" });
  await orm.em.persistAndFlush(post);
  const posts = await orm.em.find(Post, {});
  console.log(posts);
};

main().catch((error) => {
  console.error(error);
});
