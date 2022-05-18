import { validateEmail } from '../utils/helper';

export const validateUserSignup = (req, res, next) => {
  const errorList = [];
  if (!req.body.firstName || req.body.firstName.length < 5) {
    errorList.push({
      message: 'First name should be a minimum of 5 characters',
    });
  }
  if (!req.body.lastName || req.body.lastName.length < 6) {
    errorList.push({
      message:'Last name should be a minimum of 6 characters',
    });
    console.log(req.body.phoneNumber.length, 'Phone number should be 11 numbers')
  }
  if (!req.body.phoneNumber || req.body.phoneNumber.length !== 11) {
    errorList.push({ message:'Phone number should be 11 numbers'});
  }
  if (!req.body.email || !validateEmail(req.body.email)) {
    errorList.push({ message:'please insert a valid email address'});
  }
  if (!req.body.password || req.body.password.length < 6) {
    errorList.push({ message: 'password should be a minimum of 6 characters' });
  }
  console.log(errorList)
  if (errorList.length === 0) {
    next();
  } else {
    res.status(400).json({ message: errorList });
  }
};







