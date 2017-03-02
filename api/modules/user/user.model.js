import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  _id:	Schema.Types.ObjectId,
  name: String,
  location: Object,
  date: Date
});

mongoose.model('user', userSchema);
