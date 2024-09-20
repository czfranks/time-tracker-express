import { query } from '../db';
import { User, UpdateUserParams } from '../models/user';

export const indexUsers = async (): Promise<User[]> => {
  const result = await query('select * from users');
  return result.rows;
};

export const getUserById = async (id: string): Promise<User> => {
  const result = await query('select * from users where id = $1', [id]);
  return result.rows[0];
};

export const createUser = async (user: User): Promise<User> => {
  const { email, name, rate, role } = user;
  const result = await query(
    'INSERT INTO users (name, email, role, rate) values ($1, $2, $3, $4) returning *',
    [name, email, role, rate.toString()]
  );
  return result.rows[0];
};

export const updateUser = async ({
  id,
  fieldsToUpdate,
}: UpdateUserParams): Promise<User> => {
  const entries = Object.entries(fieldsToUpdate);
  if (entries.length === 0 || !id) {
    throw new Error('id and at least one field are required to update a user');
  }
  const fields: string[] = [];
  for (const [key, value] of entries) {
    fields.push(`${key}='${value}'`);
  }
  console.log(fields);
  const result = await query(
    `UPDATE users SET ${fields.join(', ')} WHERE id = ${id} returning *`
  );
  return result.rows[0];
};

export const deleteUser = async (id: string) => {
  const projects_users = (
    await query(`select * from projects_users where user_id = ${id}`)
  ).rows;
  if (projects_users.length > 0) {
    const pu_ids = projects_users.map((pu) => pu.id).join(', ');
    await query(`delete from daily_logs where project_users_id IN (${pu_ids})`);
    await query(`delete from projects_users where user_id = ${id}`);
  }
  const result = await query(`delete from users where id = ${id}`);
  return result;
};

if (0) (async () => {})();
