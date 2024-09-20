import * as userDB from '../data/users-data';
import { UpdateUserParams, User } from '../models/user';

// business logic services

export const getAllUsers = async () => {
  const users = await userDB.indexUsers();
  users.sort((userA, userB) => userB.id - userA.id);
  return users;
};

export const getUserById = async (id: string) => {
  const user = await userDB.getUserById(id);
  return user;
};

export const createUser = async (user: User) => {
  const newUser = await userDB.createUser(user);
  return newUser;
};

export const updateUser = async (id: string, user: User) => {
  const dataUser: UpdateUserParams = {
    id: Number(id),
    fieldsToUpdate: user,
  };
  const updatedUser = await userDB.updateUser(dataUser);
  return updatedUser;
};

export const deleteUser = async (id: string) => {
  return await userDB.deleteUser(id);
};
