const {Schema, model} = require('mongoose');

const Item = new Schema({
    topic: {type: String},
    desc: {type: String},
    userId: {type: String}, 
    createdDate : {type: Number}
})

module.exports = model('Item', Item);
