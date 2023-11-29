const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Configuração das rotas
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/signin',authRoutes.signin);
app.post('/cadastro',authRoutes.cadastro);
app.post('/search',authRoutes.pesquisa);

app.get('/cadastro', (req, res) => {
    res.render('cadastro');
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/search', (req, res) => {
  res.render('search');
});

  

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
