import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { CurrentUserMiddleware, ErrorHandlerMiddleware, NotFoundError } from '@eotickets/common';
import cookieSession from "cookie-session";

import { ticketsRouter } from './routes/tickets-routes';

const app = express();

// just for https
app.set('trust proxy', true);

app.use(cors());
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);


app.all('*', (req, _, next) => {
  console.log('Request: ', req.method, req.path, new Date());
  next();
});

app.use(CurrentUserMiddleware)

app.use(ticketsRouter);

app.all('*', async () => {
  throw new NotFoundError();
});
app.use(ErrorHandlerMiddleware);

export { app };
