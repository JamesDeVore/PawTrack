const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const RunSchema = new Schema({
  date: Date,
  data:[
    {
      latitude:Schema.Types.Decimal128,
      latCardinal: String,
      longitude: Schema.Types.Decimal128,
      longCardinal:String,
      altitude: Number,
      speed:Number,
      unixTime: Number
    }
  ]
})

const Run = mongoose.model('run', RunSchema)
module.exports = Run