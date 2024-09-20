import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string(),
  email: z.string(),
  role: z.string({
    required_error: 'role is required',
    invalid_type_error: 'role must be string',
  }),
  rate: z.number(),
});

export type User = z.infer<typeof UserSchema> & { id: number };
/* 
export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  rate: number;
};
 */
export interface UpdateUserParams {
  id: number;
  fieldsToUpdate: Record<string, any>;
}
