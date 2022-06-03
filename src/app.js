import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import authenticationRouter from './routes/authenticationRoute';

const app = express();

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/v1', authenticationRouter);

const swaggerDefinition = {
  info: {
    title: 'Property pro API',
    version: '1.0.0',
  },
  basePath: '/v1',
  servers: [
    {
      url: 'http://localhost:3000/v1',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use((err, req, res, next) => {
    res.status(400).json({ error: err.stack });
  });
  

export default app;