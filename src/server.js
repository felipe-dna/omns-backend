const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// define quem pode acesar a app
app.use(cors());


// configura o servidor para escutar tanto requisições http quanto requisições ws (web socket)
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Eventos do socket.io
io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});



// conexão com bancos de dados
mongoose.connect(
    "mongodb+srv://gilfoyle:aodejpiex@cluster0-gx3t5.mongodb.net/omnistack?retryWrites=true",
    {
        useNewUrlParser: true
    }
)

// Definindo um middleware global do socket io
app.use( (req, res, next) => { 
    // define que todas as requisições terão acesso à uma propriedade "io" dentro da requisição
    req.io = io;

    return next(); 
});


// ajuda o express a lidar com dados em json
app.use(express.json());

// ajuda o express a lidar com arquivos nas requisições
app.use(express.urlencoded({ extended: true }))

// fala para o express usar como alvo a pasta tmp quando chamado o diretório /files
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

// arquivo de rotas
app.use(require('./routes'));

// servidor escutando a porta 3333
server.listen(3333);