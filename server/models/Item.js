const {Schema, model} = require('mongoose');

const Item = new Schema({
    topic: {type: String},
    desc: {type: String},
    userId: {type: String}, 
    createdDate : {type: Number},
    tags: [{type: Object, ref: 'Tag'}],
    collectionId : {type: String},
    customField1_bool: {type: Boolean},
    customField1_name: {type: String},
    customField1_value: {type: String},
    customField2_bool: {type: Boolean},
    customField2_name: {type: String},
    customField2_value: {type: String},
    customField3_bool: {type: Boolean},
    customField3_name: {type: String},
    customField3_value: {type: String}
})

module.exports = model('Item', Item);
