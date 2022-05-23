import jwt from 'jsonwebtoken';

const {id} = data.rows[0]
    const newUser = { id, firstName, lastName, email};

  const token = jwt.sign({ newUser}, process.env.TOKEN_KEY, {
    expiresIn: '30m',
  });
export const verifyToken = (req, res, next) => {
  const token = req.headers['authentication'];
  if (!token) {
    res.status(401).json({ message: 'Account created successfully!' });
  }
  try {
    const checkToken = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = checkToken;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Validation denied' });
  }
};


export function validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }