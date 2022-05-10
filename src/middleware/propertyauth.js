import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization Denied'];
  if (!token) {
    res.status(401).send('Denied Entry');
  }
  try {
    const checkToken = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = checkToken;
    next();
  } catch (err) {
    res.status(401).send('Token not valid');
  }
};