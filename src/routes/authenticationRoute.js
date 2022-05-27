import express from 'express';

import { signupAgent, agentLogin } from '../controllers/Agent';

import {
    getAgentProperties, allProperties, createProperty,
    deleteProperty, editProperty, getPropertyById
  } from '../controllers/propertyDetails/property';

import { validatePropertyInput, validateUserSignup } from '../middleware/middleware';
import { verifyToken } from '../middleware/propertyauth';

const authenticationRouter = express.Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
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
 *                         example: 31
 *                       first_name:
 *                         type: string
 *                         description: The user's firstName.
 *                         example: 'Holamide'
 *                       last_name:
 *                         type: string
 *                         description: The user's lastName.
 *                         example: 'yinola'
 *                       email:
 *                         type: string
 *                         description: The user's email.
 *                         example: 'hola2021@gmail.com'
 *                       password:
 *                         type: string
 *                         description: The user's password.
 *                         example: 'sholakemi123'
 *                       phone_number:
 *                         type: string
 *                         description: The user's phoneNumber.
 *                         example: '09087654363'
 */      
authenticationRouter.post('/signup', validateUserSignup, signupAgent);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login agent.
 *     description: Agent Login to be able to post, edit and delete property posted.
 *     responses:
 *       200:
 *         description: Users logged in successfully.
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
 *                         example: 31
 *                       email:
 *                         type: string
 *                         description: The user's email.
 *                         example: 'hola2021@gmail.com'
 */
authenticationRouter.post('/login', agentLogin);
authenticationRouter.post('/agent/properties', verifyToken, validatePropertyInput, createProperty)
authenticationRouter.get('/properties', allProperties);
authenticationRouter.get('/property/:id', getPropertyById);
authenticationRouter.get('/agent/property/:id', verifyToken, getAgentProperties);
authenticationRouter.put('/property/:userId', verifyToken, editProperty);
authenticationRouter.delete('/agent/property/:id', verifyToken, deleteProperty);

export default authenticationRouter;