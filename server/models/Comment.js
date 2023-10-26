const {Schema, model} = require('mongoose');

const Comment = new Schema({
    itemId: {type: String},
    userId: {type: String},
    text: {type: String},
    likes: [{type: String}],
    createdDate: {type: String}
})

module.exports = model('Comment', Comment);
