const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceCallSchema = new Schema({
    tableCode: {
        type: String
    },
    serviced: {
        type: Boolean
    },
    callTime: {
        type: String
    }
});

module.exports.ServiceCall = mongoose.model('ServiceCall', ServiceCallSchema);
