const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TableSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    organizationId: {
        type: Schema.Types.ObjectId, ref: 'Organization',
        required: true
    }
});

module.exports.Table = mongoose.model('Table', TableSchema);
