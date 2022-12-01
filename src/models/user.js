import mongoose, { model, Schema } from 'mongoose';

mongoose.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  names: {
    type: String,
  },
});

const User = model('User', userSchema);
export { User };
