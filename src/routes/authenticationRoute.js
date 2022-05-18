import express from 'express';

import { signupAgent, agentLogin } from '../controllers/Agent';

import { validateUserSignup } from '../middleware';

const authenticationRouter = express.Router();

authenticationRouter.post('/signup', validateUserSignup, signupAgent);
authenticationRouter.post('/login', agentLogin);

export default authenticationRouter;