const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuItemSchema = new Schema({
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

module.exports.MenuItem = mongoose.model('MenuItem', MenuItemSchema);
