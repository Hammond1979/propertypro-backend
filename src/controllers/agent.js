import Model from '../models/model';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
import dotenv from 'dotenv'
const agentModel = new Model('agents');
dotenv.config();

export const signupAgent = async (req, res) => {
  const { firstName, lastName, password, email, phoneNumber } = req.body;
  const columns = 'first_name, last_name, password, email, phone_number';
  const strong = await bcrypt.hash(password, 12);
  const values = `'${firstName}', '${lastName}', '${strong}', '${email}', '${phoneNumber}'`;
  try {
  const checkEmail = await agentModel.select(
    '*',
    ` where email = '${email}' `
  );
    if (checkEmail.rowCount > 0 ) {
      return res.status(409).json({ message: 'Account already Exist' });
    }
    const data = await agentModel.insertWithReturn(columns, values);
    const newUser = { firstName, lastName, email };

    const token = jwt.sign({ ...newUser, id: data.rows.id }, process.env.TOKEN_KEY, {
      expiresIn: '30m',
    });
    res.status(201).send({ user: newUser, token, message: 'Account created successfully' });
   } catch (err) {
     res.status(400).json({ message: err.stack });
   }
};


export const agentLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validEmail = await agentModel.select('*', ` WHERE  email = '${email}' `);
    if (!validEmail.rows.length) return res.status(400).json({ messages: 'Validate email or password 1' });
    const validPassword = await bcrypt.compare(password, validEmail.rows[0].password);
    if (!validPassword) return res.status(400).json({ message: 'Validate email or password' });
    const user = { email };
    const token = jwt.sign({ user }, process.env.TOKEN_KEY, {
      expiresIn: '30m',
    });
    return res.status(201).send({ ...user, token, message: 'Successfully Logged in' });
  } catch (err) {
    res.status(400).json({ message: err.stack });
  }
};



