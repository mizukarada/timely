var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: { type: String },
  tags: [{ type: Schema.ObjectId, ref: 'Tag' }],
  periods: [{ start: Number, end: Number }],
  date: { type: Date, required: true }
});


module.exports = mongoose.model('Task', TaskSchema);
