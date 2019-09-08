var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var OrderSchema = new Schema({
    barTabId: {
        type: String
    },
    tableCode: {
        type: String
    },
    menuItemId: {
        type: Schema.Types.ObjectId, ref: 'MenuItem', required: true
    },
    paid : {
        type: Boolean
    },
    cancelled : {
        type: Boolean
    }
});
module.exports = mongoose.model('Order', OrderSchema);
