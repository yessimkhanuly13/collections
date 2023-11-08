const {Schema, model} = require('mongoose');

const Tag = new Schema({
    value:{type: String}
})

module.exports = model('Tag', Tag);