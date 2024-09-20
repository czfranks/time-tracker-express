import usersRouter from './routers/users-router';
import express from 'express';
import morgan from 'morgan';

const app = express();
const port = 3000;
app.disable('x-powered-by');

//middleware
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);
//json body
app.use(express.json());

//router
app.use('/users', usersRouter);

//root route
app.get('/', (_req, res) => {
  res.send('Welcome to API');
});

//server up
app.listen(port, () => {
  console.log(`serving at http://localhost:${port}`);
});
