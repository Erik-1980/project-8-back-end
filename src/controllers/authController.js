const User  = require('../models/UsersModel');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

// Регистрация
exports.register = async (req, res, next) => {
  const { email, password } = req.body;
  const users = await User.getUserByUsername(email);
  if(users != undefined && email===users.email){
    return res.status(401).json({ message: 'User with this name is already registered'});
  }
  const hashedPassword = CryptoJS.SHA256(password).toString();
  try {
    await User.createUser(email, hashedPassword);
    res.status(201).json({ message: 'User created successfully!', email });
  } catch (error) {
    next(error);
  }
};

// Аутентификация
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const hashedPassword = CryptoJS.SHA256(password).toString();
  try {
    const user = await User.getUserByUsername(email);
    if (!user || user.password !== hashedPassword) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = generateToken(user.id, user.email, user.isAdmin, user.verification);
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

// Обновление токена
exports.refreshToken = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const newToken = generateToken(decodedToken.id, decodedToken.email, decodedToken.isAdmin, decodedToken.verification);
    res.json({ token: newToken });
  } catch (error) {
    next(error);
  }
};

// Генерация JWT токена
function generateToken(id, email, isAdmin, verification) {
  const secret = JWT_SECRET;
  const token = jwt.sign({ id, email, isAdmin, verification }, secret, { expiresIn: '1h' });
  return token;
}