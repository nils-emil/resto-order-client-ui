const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MenuItemAmountSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    menuItemId: {
        type: Schema.Types.ObjectId, ref: 'MenuItem',
        required: true
    },
});

const OrderSchema = new Schema({
    tableCode: {
        type: String
    },
    organizationId: {
        type: Schema.Types.ObjectId, ref: 'Organization',
        required: true
    },
    orderContent: [MenuItemAmountSchema],
    paid: {
        type: Boolean
    },
    cancelled: {
        type: Boolean
    },
    isWaiting: {
      type: Boolean
    },
    createdTime: {
      type: Date
    },
    callType: {
        type: String
    },
})
module.exports.MenuItemAmount = mongoose.model('MenuItemAmount', MenuItemAmountSchema);
module.exports.Order = mongoose.model('Order', OrderSchema)
