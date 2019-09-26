const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TableSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    }
});

module.exports.Table = mongoose.model('Table', TableSchema);
