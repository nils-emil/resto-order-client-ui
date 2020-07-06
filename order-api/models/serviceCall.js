const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ServiceCallSchema = new Schema({
  tableCode: {
    type: String
  },
  callType: {
    type: String
  },
  isWaiting: {
    type: Boolean
  },
  createdTime: {
    type: String
  },
  createdDate: {
    type: String
  }
})

module.exports.ServiceCall = mongoose.model('ServiceCall', ServiceCallSchema)
