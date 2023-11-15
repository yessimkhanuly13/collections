const {Schema, model} = require('mongoose');

const Comment = new Schema({
    value: {type: String},
    username: {type: String},
    likes: [{type: String}],
    createdDate: {type: Number}
})

module.exports = model('Comment', Comment);
