const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TabSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tableCode: {
        type: String,
        required: true
    },
    active: {
        type: Boolean
    }
});

module.exports.Tab = mongoose.model('Tab', TabSchema);
