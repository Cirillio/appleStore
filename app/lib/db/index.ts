import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const conn = process.env.DATABASE_URL!;

const client = postgres(conn, { prepare: false });

export const db = drizzle(client, { schema });
