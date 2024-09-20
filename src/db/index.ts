import pg from 'pg';

const pool = new pg.Pool({
  user: process.env['PG_USER'],
  password: process.env['PG_PASSWORD'],
  host: 'localhost',
  port: 5432,
  database: 'time_tracker',
});

export const query = (text: string, params?: string[]) => {
  return pool.query(text, params);
};
