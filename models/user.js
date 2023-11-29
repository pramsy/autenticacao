const mongoose = require('../db');
const UserSchema = new mongoose.Schema({
  nome: String,
  email: { type: String, unique: true },
  senha: String,
  telefones: [
    {
      numero: String,
      ddd: String,
    },
  ],
  data_criacao: { type: Date, default: Date.now },
  data_atualizacao: { type: Date, default: Date.now },
  ultimo_login: { type: Date, default: Date.now },
  token: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
