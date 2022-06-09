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
 * definitions:
 *   Register:
 *     properties:
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       phoneNumber: 
 *         type: string
 *     example: {
 *       "firstName": franklin,
 *       "lastName": iremivoh,
 *       "email": frank@gmail.com,
 *       "password": dealwap123,
 *       "phoneNumber": 09123453722
 *      }
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     tags:
 *       - Users & Authentication
 *     description: Register/Signs up a User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Register'
 *     responses:
 *       201:
 *         description: Successfully created
 *         example: {
 *           "message": "Signed up successfully",
 *           "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJpc0Jhbm5lZCI6MCwicGxhbiI6IlNpbHZlciIsImFjdGl2ZSI6ZmFsc2UsImlzQWRtaW4iOjAsImlkIjo1LCJ1c2VybmFtZSI6InRlc3RlciIsImZ1bGxOYW1lIjoiTmFzaXJ1IE9sYSIsImVtYWlsIjoibmFzaXJ1QGdtYWlsLmNvbSIsInVzZXJJZCI6NX0sImV4cCI6MTUxNTI1ODY4NywiaWF0IjoxNTE1MTcyMjg3fQ.1cISJjOboFY1zxqKEIZFpBJTSawG7BkMG6iGdhMxxGU"
 *       }
 *       400:
 *         description: Bad Username, Password or Email
 *       500:
 *         description: Internal server error
 */
authenticationRouter.post('/signup', validateUserSignup, signupAgent);

/**
 * @swagger
 * definitions:
 *   Login:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 *     example: {
 *       "email": frank@gmail.com,
 *       "password": dealwap123
 *      }
 */


/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Users & Authentication
 *     description: login a User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Login'
 *     responses:
 *       201:
 *         description: Successfully created
 *         example: {
 *           "message": "Logged in successfully",
 *           "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXJyZW50VXNlciI6eyJpc0Jhbm5lZCI6MCwicGxhbiI6IlNpbHZlciIsImFjdGl2ZSI6ZmFsc2UsImlzQWRtaW4iOjAsImlkIjo1LCJ1c2VybmFtZSI6InRlc3RlciIsImZ1bGxOYW1lIjoiTmFzaXJ1IE9sYSIsImVtYWlsIjoibmFzaXJ1QGdtYWlsLmNvbSIsInVzZXJJZCI6NX0sImV4cCI6MTUxNTI1ODY4NywiaWF0IjoxNTE1MTcyMjg3fQ.1cISJjOboFY1zxqKEIZFpBJTSawG7BkMG6iGdhMxxGU"
 *       }
 *       400:
 *         description: Bad Username, Password or Email
 *       500:
 *         description: Internal server error
 */
authenticationRouter.post ('/login', agentLogin);

/**
 * @swagger
 * definitions:
 *   Property:
 *     properties:
 *       image:
 *         type: string
 *       title:
 *         type: string
 *       address:
 *         type: string
 *       city:
 *         type: string
 *       landArea:
 *         type: string
 *       noOfBath:
 *         type: string
 *       noOfBed:
 *         type: string
 *       landSize:
 *         type: string
 *     example: [
 *           {
 *       "image": game.png,
 *       "title": "duplex",
 *       "address": "isolo street",
 *       "city": "Lagos state",
 *       "landArea": "5",
 *       "noOfBath": "3",
 *       "noOfBed": "2",
 *       "landSize": 200
 *        }
 *       ]
 */

/**
 * @swagger
 * /agent/properties:
 *   post:
 *     tags:
 *       - Property Details
 *     description: Add a new property to the database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: properties
 *         description: property object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Properties'
 *       - name: access_token
 *         in: header
 *         description: an authentication header
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: property uploaded successfully
 *       400:
 *         description: Bad input supplied
 *       500:
 *         description: Internal server error
 */
 authenticationRouter.post(
   '/agent/properties', 
   verifyToken, 
   validatePropertyInput, 
   createProperty
   );   



/**
 * @swagger
 * definitions:
 *   Properties:
 *     properties:
 *       image:
 *         type: string
 *       title:
 *         type: string
 *       address:
 *          type: string
 *       city:
 *         type: string
 *       landArea:
 *         type: string
 *       noOfBath:
 *         type: string
 *       noOfBed:
 *         type: string
 *       landSize:
 *         type: string
 *     example: [
 *          {
 *       "image": game.png,
 *       "title": "duplex",
 *       "address": "20, Allen str,surulere",
 *       "city": "Lagos state",
 *       "landArea": 500,
 *       "noOfBath": "3",
 *       "noOfBed": "2",
 *       "landSize": 200
 *        }
 *       ]
 */


/**
 * @swagger
 * /properties:
 *   get:
 *     tags:
 *       - Property Details
 *     description: retrive all properties from database
 *     produces:
 *       - application/json
 *     parameters:
 *         schema:
 *           $ref: '#/definitions/Properties'
 *     responses:
 *       200:
 *         description: property uploaded successfully
 *     example: [
 *            {
 *         "id": 14,
 *         "agent_id": 48,
 *         "image_url": "game.png",
 *         "title": "duplex",
 *         "address": "20, Allen str,surulere",
 *         "city": "Lagos state",
 *         "land_area": "500",
 *         "no_of_baths": 3,
 *         "no_of_beds": 2,
 *         "land_size": 200
 *            }
 *           ]
 */
  authenticationRouter.get(
  '/properties', 
  allProperties
  );

  /**
 * @swagger
 * /property/{id}:
 *   get:
 *     tags:
 *       - Property Details
 *     description: To get a particular properties from database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of property
 *         in: path
 *         type: integer
 *         require: true
 *         schema:
 *           $ref: '#/definitions/Properties'
 *     responses:
 *       200:
 *         description: property uploaded successfully
 *     example: [
 *           {
 *         "id": 14,
 *         "agent_id": 48,
 *         "image_url": "game.png",
 *         "title": "duplex",
 *         "address": "20, Allen str,surulere",
 *         "city": "Lagos state",
 *         "land_area": "500",
 *         "no_of_baths": 3,
 *         "no_of_beds": 2,
 *         "land_size": 200
 *          }
 *         ]
 */
authenticationRouter.get('/property/:id', getPropertyById);

/**
 * @swagger
 * /agent/property/{id}:
 *   get:
 *     tags:
 *       - Property Details
 *     description: To retrieve a property from database by using the property id.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of property
 *         in: path
 *         type: integer
 *         require: true
 *       - name: access_token
 *         in: header
 *         type: string
 *     example: [
 *          {
 *       "image": game.png,
 *       "title": "duplex",
 *       "address": "20, Allen str,surulere",
 *       "city": "Lagos state",    
 *       "landArea": 500,
 *       "noOfBath": "3",
 *       "noOfBed": "2",
 *       "landSize": 200
 *        }
 *       ]
 *     responses:
 *       200:
 *         description: property uploaded successfully
 *       400:
 *         description: Bad input supplied
 *       500:
 *         description: Internal server error
 */
 authenticationRouter.get(
  '/agent/property/:id', 
   verifyToken, 
   agentProperties
   );

/**
 * @swagger
 * /property/{userId}:
 *   put:
 *     tags:
 *       - Property Details
 *     description: To edit a property from the database using the property id and the token.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         description: ID of the User
 *         in: path
 *         required: true
 *         type: integer
 *       - name: userId
 *         description: ID of property to Return
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Property'
 *           type: object
 *       - name: access_token
 *         in: header
 *         type: string
 *     example: [
 *         {
 *       "agent_id": 52,
 *       "image_url": game.png,
 *       "title": "duplex",
 *       "address": "20, Allen str,surulere",
 *       "city": "Lagos state",    
 *       "land_area": 500,
 *       "no_of_bath": "3",
 *       "no_of_bed": "2",
 *       "land_size": 200
 *        }
 *       ]
 *     responses:
 *       200:
 *         description: property uploaded successfully
 *       400:
 *         description: Bad input supplied
 *       500:
 *         description: Internal server error
 */
 authenticationRouter.put('/property/:userId', verifyToken, editProperty);


 /**
 * @swagger
 * /agent/property/{id}:
 *   delete:
 *     tags:
 *       - Property Details
 *     description: To delete a property from database
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of property
 *         in: path
 *         type: integer
 *         require: true
 *         schema:
 *           $ref: '#/definitions/Properties'
 *           type: object
 *       - name: access_token
 *         in: header
 *         type: string
 *     responses:
 *       200:
 *         description: property deleted successfully
 *       400:
 *         description: Bad input supplied
 *       500:
 *         description: Internal server error
 */
  authenticationRouter.delete(
  '/agent/property/:id', 
  verifyToken, 
  deleteProperty
  );

 

 export default authenticationRouter; 