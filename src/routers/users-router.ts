import { ZodError } from 'zod';
import { User, UserSchema } from '../models/user';
import * as usersService from '../services/users-service';
import express, { Request, Response } from 'express';

const usersRouter = express.Router();

//show users
usersRouter.get('/', async (_req, res) => {
  try {
    const users = await usersService.getAllUsers();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong');
  }
});

//show user by id
usersRouter.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const user = await usersService.getUserById(id);
    if (!user) {
      res.status(404).send('Not found');
      return;
    }
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Something went wrong while creating the user');
  }
});

//create user
usersRouter.post('/', async (req, res) => {
  try {
    const userData: User = req.body;
    UserSchema.parse(userData); // throws ZodError
    const newUser = await usersService.createUser(userData);
    res.status(201).json({
      message: 'created user',
      user: newUser,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).send({
        status: 'Validation error while creating user.',
        error: error.issues.map((e) => ({
          path: e.path.join(''),
          message: e.message,
        })),
      });
      return;
    }
    res.status(500).send(error);
  }
});

//update user
const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const updatedUser = await usersService.updateUser(id, userData);
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send('Something went wrong while updating the user');
  }
};
usersRouter.patch('/:id', async (req, res) => {
  updateUserController(req, res);
});
usersRouter.put('/:id', async (req, res) => {
  updateUserController(req, res);
});

//delete user
usersRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersService.getUserById(id);
    if (!user) {
      res.status(404).send(`User id:${id} not found`);
      return;
    }
    await usersService.deleteUser(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).send('Something went wrong while deleting the user');
  }
});

export default usersRouter;
