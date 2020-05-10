const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    organizationId: {
        type: Schema.Types.ObjectId, ref: 'Organization',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    categoryId: {
        type: Schema.Types.ObjectId, ref: 'Category',
        required: false
    }
});

module.exports.MenuItem = mongoose.model('MenuItem', MenuItemSchema);
