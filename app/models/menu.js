var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MenuItemSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    organization: {
        type: String
    },
    price: {
        type: Number
    },
    image: {
        type: String
    },
});
module.exports = mongoose.model('MenuItem', MenuItemSchema, 'menuItems');
