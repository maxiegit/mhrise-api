require('dotenv').config();

const express = require('express')
var cors = require('cors');;
const app = express()
const mongoose = require('mongoose');
const { createProxyMiddleware } = require('http-proxy-middleware');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected'))

app.use(express.json())
app.use(cors())
app.use('/api', createProxyMiddleware({ 
    target: 'http://localhost:3000/', //original url
    changeOrigin: true, 
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));

const itemsRouter = require('./routes/items');
app.use('/items', itemsRouter)

app.listen(3000, () => console.log('Server Started'))