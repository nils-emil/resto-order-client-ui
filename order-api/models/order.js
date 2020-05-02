const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    barTabId: {
        type: Schema.Types.ObjectId, ref: 'Tab', required: true
    },
    tableCode: {
        type: String
    },
    menuItem: {
        type: Schema.Types.ObjectId, ref: 'MenuItem', required: true
    },
    paid: {
        type: Boolean
    },
    cancelled: {
        type: Boolean
    }
});

module.exports.Order = mongoose.model('Order', OrderSchema);
