import express from 'express';

import { signupAgent, agentLogin } from '../controllers/Agent';

import {
    agentProperties, allProperties, createProperty,
    deleteProperty, editProperty, getPropertyById
  } from '../controllers/propertyDetails/property';

import { validatePropertyInput, validateUserSignup } from '../middleware/middleware';
import { verifyToken } from '../middleware/propertyauth';

const authenticationRouter = express.Router();

/**
 * @swagger
 * /signup:
 *   post:
 *      summary: Create a new user.
 *      description: Create a new user to be able to post a property.
 *      responses:
 *       201:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 */
authenticationRouter.post('/signup', validateUserSignup, signupAgent);
authenticationRouter.post('/login', agentLogin);
authenticationRouter.post('/agent/properties', verifyToken, validatePropertyInput, createProperty)
authenticationRouter.get('/properties', allProperties);
authenticationRouter.get('/property/:id', getPropertyById);
authenticationRouter.get('/agent/property/:id', verifyToken, agentProperties);
authenticationRouter.put('/property/:userId', verifyToken, editProperty);
authenticationRouter.delete('/agent/property/:id', verifyToken, deleteProperty);

export default authenticationRouter;