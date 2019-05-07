// [LOAD PACKAGES]
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
// const WebpackDevServer = require('webpack-dev-server');
// const webpack = require('webpack');
// const path = require('path');
// const morgan = require('morgan'); // HTTP req. log

const app = express();

// app.use(morgan('dev'));

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// [CONFIGURE SERVER PORT]
// const port = process.env.PORT || 8080;
const port = 3000;
// const devPort = 4000;

// [ CONFIGURE mongoose ]
// CONNECT TO MONGODB SERVER
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    // CONNECTED TO MONGODB SERVER
    console.log('Connected to mongod server');
});

mongoose.connect('mongodb://localhost/mongodb_tutorial', { useNewUrlParser: true });

// [USE SESSION]
app.use(session({
    secret: 'NodeJS$1$234',
    resave: false,
    saveUninitialized: true
}));

// [HANDLE ERROR]
// 라우터에서 throw err 실행 시 실행
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// DEFINE MODEL
// var Book = require('./models/book');


// [CONFIGURE ROUTER]
// var router = require('./routes') (app, Book);
const index = require('./routes');
app.use('/api', index);

/* support client-side routing */
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './../public/index.html'));
// });

// if(process.env.NODE_ENV == 'development') {
//     console.log('Server is running on development mode');
//     const config = require('./webpack.dev.config');
//     const compiler = webpack(config);
//     const devServer = new WebpackDevServer(compiler, config.devServer);
//     devServer.listen(
//         devPort, () => {
//             console.log('webpack-dev-server is listening on port', devPort);
//         }
//     );
// }

// [RUN SERVER]
const server = app.listen(port, () => {
    console.log('Express server has started on port ' + port);
});