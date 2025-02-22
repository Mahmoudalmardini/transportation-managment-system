const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');


const passengerRoutes = require('./routes/passenger');
const busstationRoutes = require('./routes/busstation');


const authRoutes = require('./routes/auth');
const { Socket } = require('socket.io');
const app = express();

app.use(bodyParser.json()); //application/json


app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
    });

    app.use('/passenger', passengerRoutes);//forward the request
    app.use('/auth', authRoutes);
    app.use('/busstation', busstationRoutes);

    


    app.use((error, req, res, next) =>{
        console.log(error);
        const status = error.statusCode || 500;
        const message = error.message;
        const data = error.data;// for handling the error in the auth
        res.status(status).json({message:message, data:data});//middleware to handle the error 
    });
    
    
    mongoose.connect('mongodb://localhost:27017/Api',{
    }).then(result =>{
        const server = app.listen(8080);
        const io = require('socket.io')(server);
        io.on('connection',socket =>{
            console.log('client connected');
        });
    }).catch(err => console.log(err));