const {Schema, model} = require('mongoose');

const User = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required:true},
    items: {type: Array}
})

module.exports = model('User', User);