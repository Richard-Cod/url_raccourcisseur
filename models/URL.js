var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const shortid = require('shortid');
 
URL_BASE = "http://localhost:5000/";


var urlSchema = new Schema({
  urlCode: {
    type: String,
    required: true
  },
  longueUrl: {
    unique: true,
    type: String,
    required: true
  },
  courteUrl: {
    type: String,
    required: true
  },
  date: { type: Date, default: Date.now },
});



urlSchema.methods.setUrlCode = function () {
  this.urlCode = shortid.generate()
}

urlSchema.methods.makeRaccourcis = function () {
  return URL_BASE + this.urlCode
}


var Url = mongoose.model('Url', urlSchema);

module.exports = Url