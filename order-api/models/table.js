const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TableSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  organizationId: {
    type: Schema.Types.ObjectId, ref: 'Organization',
    required: true
  },
  number: {
    type: String,
    required: true
  },
  xPosition: {
    type: Number,
    required: true
  },
  yPosition: {
    type: Number,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  }
})

module.exports.Table = mongoose.model('Table', TableSchema)
