import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_DB = process.env.MONGODB_DB || "pathwise";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

declare global {
  var _mongo: {
    client: MongoClient | null;
    db: Db | null;
    promise: Promise<Db> | null;
  };
}

global._mongo = global._mongo || { client: null, db: null, promise: null };

export async function connectDB(): Promise<Db> {
  if (global._mongo.db) {
    return global._mongo.db;
  }

  if (!global._mongo.promise) {
    const client = new MongoClient(MONGODB_URI);
    global._mongo.client = client;
    global._mongo.promise = client.connect().then((c) => c.db(MONGODB_DB));
  }

  global._mongo.db = await global._mongo.promise;
  return global._mongo.db;
}

export function getDb(): Db {
  if (!global._mongo.db) {
    throw new Error("Database not connected. Call connectDB() first.");
  }
  return global._mongo.db;
}
