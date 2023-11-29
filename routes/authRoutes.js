// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

async function cadastro(req, res) {
  try {
   
    const user = await userController.createUser(req.body);
    return res.json(user);
    
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
}

async function signin(req, res) {
  try {
   
    const user = await authController.authenticateUser(req.body.email, req.body.senha);
    return res.json(user);
  } catch (error) {
    res.status(401).json({ mensagem: error.message });
  }
}

async function pesquisa(req, res) {
  try {
   
    const user = await userController.search(req);
    return res.json(user);
  } catch (error) {
    res.status(401).json({ mensagem: error.message });
  }
}

module.exports = {
    signin,
    cadastro,
    pesquisa,
};
