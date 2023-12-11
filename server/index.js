const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./router/authRouter');
const cors = require('cors');
const userRouter = require('./router/userRouter');
const itemsRouter = require('./router/itemsRouter');
const collectionRouter = require('./router/collectionRouter');
const searchRouter = require('./router/searchRouter');
const tagRouter = require('./router/tagRouter');
const Item = require('./models/Item')
const Comment = require('./models/Comment')
const http = require('http')
const { Server } = require('socket.io')
require('dotenv').config();

const PORT = process.env.PORT;
const password = process.env.DATABASE_PASS;
const CLIENT = process.env.CLIENT

const app = express();

app.use(cors());
app.use(express.json());

app.use('/search', searchRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/items', itemsRouter);
app.use('/collections', collectionRouter);
app.use('/tag', tagRouter );


const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: CLIENT,
        methods: [ "GET", "POST" ]
    },

})

io.on("connection", (socket)=>{
    socket.on('send_comment', async (data)=>{
        try{
            const {username, value, userId, itemId} = data

            const comment = new Comment({username, value, createdDate: Date.now(), userId})
            await comment.save();

            const item = await Item.findById(itemId)
            item.comments.push(comment);

            await item.save();
            socket.emit('recieve_comment', item);
            socket.broadcast.emit("recieve_comment", item);
        }catch(e){
            console.log(e)
        }
    })
    
})

const start = async() =>{
    try{
        server.listen(PORT, ()=>console.log(`Server is on PORT: ${PORT}`));
        await mongoose.connect(`mongodb+srv://yessimkhanuly:${password}@finalproject.eqf0ru7.mongodb.net/?retryWrites=true&w=majority`)
    }catch(e){
        console.log(e);
    }
}

start();