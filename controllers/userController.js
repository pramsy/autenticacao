const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function createUser(body) {
  try {
    if (!body.senha) {
      throw new Error('Senha não fornecida1.');
    }
    const existingUser = await User.findOne({ email: body.email });

    if (existingUser) {
      throw new Error('O email já está em uso.'.body.email);
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.senha, saltRounds);
    
    const user = new User({
      nome: body.nome,
      email: body.email,
      senha: hashedPassword,
      telefones: [{ numero: body.numero, ddd: body.ddd}],
    });
    
    await user.save();

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
    }]);

  } catch (error) {
    throw error;
  }
}
async function search(req){
  const token = req.headers.authorization.split(' ')[1];   

  try{
    const decode = jwt.verify(token,'seu_segredo_do_jwt')    
    return {userId: decoded.userId};
    

  }catch(error){
    throw error
  }
}

module.exports = {
  createUser,
  search,
};

