import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const dbPool = new pg.Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  ssl: true,
});

export default dbPool;
