const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./router/authRouter');
const cors = require('cors');
const userRouter = require('./router/userRouter');
const itemsRouter = require('./router/itemsRouter');
require('dotenv').config();

const PORT = process.env.PORT;
const password = process.env.DATABASE_PASS;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/items', itemsRouter);


const start = async() =>{
    try{
        app.listen(PORT, ()=>console.log(`Server is on PORT: ${PORT}`));
        await mongoose.connect(`mongodb+srv://yessimkhanuly:${password}@finalproject.eqf0ru7.mongodb.net/?retryWrites=true&w=majority`)
    }catch(e){
        console.log(e);
    }
}

start();