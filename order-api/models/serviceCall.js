const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ServiceCallSchema = new Schema({
  message: {
    type: String
  },
  isWaiting: {
    type: Boolean
  },
  callTime: {
    type: String
  },
  callDate: {
    type: String
  }
})

module.exports.ServiceCall = mongoose.model('ServiceCall', ServiceCallSchema)
