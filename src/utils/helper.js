import jwt from 'jsonwebtoken';

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

  // export const token = jwt.sign({ ...newUser, id: data.rows.id }, process.env.TOKEN_KEY, {
  //   expiresIn: '30m',
  // });