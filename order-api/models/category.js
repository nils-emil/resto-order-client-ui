const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    organizationId: {
        type: Schema.Types.ObjectId, ref: 'Organization',
        required: true
    }
});

module.exports.Category = mongoose.model('Category', CategorySchema);
