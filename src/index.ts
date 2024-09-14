import express from 'express';
import pg from 'pg';

const app = express();

const pool = new pg.Pool({
  user: process.env['PG_USER'],
  password: process.env['PG_PASSWORD'],
  host: 'localhost',
  port: 5432,
  database: 'time_tracker',
});

app.get('/', (_req, res) => {
  res.send('Hello world');
});

app.get('/users', async (_req, res) => {
  const result = await pool.query('select * from users');
  const users = result.rows;
  res.json(users);
});

app.listen(3000, () => {
  console.log('serving at http://localhost:3000');
});
