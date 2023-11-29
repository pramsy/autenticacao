// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

async function authenticateUser(email, senha) {
  try {
    const user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(senha, user.senha)) {
      throw new Error('Usuário e/ou senha inválidos');
        
    }

    // Atualiza o último login e salva o token
    user.ultimo_login = new Date();
    user.token = jwt.sign({ id: user._id }, 'seu_segredo_do_jwt', { expiresIn: '30m' });
    await user.save();

    return ([{
    "id":user.id,
    "data_criacao":user.data_criacao,
    "data_atualizacao":user.data_atualizacao,
    "ultimo_login":user.ultimo_login,
    "token":user.token,
    }
    ])
  } catch (error) {
    throw error;
  }
}


module.exports = {
  authenticateUser,
 
};
