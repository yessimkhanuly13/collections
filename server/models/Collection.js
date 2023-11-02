const {Schema, model} = require('mongoose');

const Collection = new Schema({
    name: {type: String},
    description: {type: String},
    theme: {type: String},
    items: [{type: Object, ref: 'Item'}]
})

module.exports = model('Collection', Collection);