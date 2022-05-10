import express from 'express';

import { signupAgent, agentLogin } from '../controllers/Agent';

import {
    agentProperties, allProperties, createProperty,
    deleteProperty, editProperty, getPropertyById
  } from '../controllers/propertyDetails/property';

import { validatePropertyInput, validateUserSignup } from '../middleware/middleware';
import { verifyToken } from '../middleware/propertyauth';

const authenticationRouter = express.Router();

authenticationRouter.post('/signup', validateUserSignup, signupAgent);
authenticationRouter.post('/login', agentLogin);
authenticationRouter.get('/properties', allProperties);
authenticationRouter.get('/property/:id', getPropertyById);
authenticationRouter.post('/post-property', verifyToken, validatePropertyInput, createProperty);
authenticationRouter.get('/post-property/:id', verifyToken, agentProperties);
authenticationRouter.put('/property/:id', verifyToken, editProperty);
authenticationRouter.delete('/property/:id', verifyToken, deleteProperty);

export default authenticationRouter;