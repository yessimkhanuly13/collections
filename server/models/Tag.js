const {Schema, model} = require('mongoose');

const Tag = new Schema({
    value:{type: String, unique: true}
})

module.exports = model('Tag', Tag);