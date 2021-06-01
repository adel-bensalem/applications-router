import { Db } from "mongodb";
import { Repository } from "@core";

const createRepository = (db: Db): Repository => ({
  findApplication: (name) =>
    db.collection("ports").findOne({ name: { $eq: name } }),
});

export { createRepository };
