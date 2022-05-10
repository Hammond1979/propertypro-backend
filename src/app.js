import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import authenticationRouter from './routes/authenticationRoute';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/v1', authenticationRouter);
app.use((err, req, res, next) => {
    res.status(400).json({ error: err.stack });
  });
  

export default app;