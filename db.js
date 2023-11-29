const mongoose = require('mongoose');
// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/empresa');

// Verificar se a conexão foi estabelecida com sucesso
const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Erro na conexão com o MongoDB:', error);
});

db.once('open', () => {
  console.log('Conexão bem-sucedida com o MongoDB!');
});
mongoose.Promise = global.Promise;

module.exports = mongoose;
