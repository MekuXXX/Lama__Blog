import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      index: {
        unique: true,
        dropDups: true,
      },
      required: true,
    },
    email: {
      type: String,
      index: {
        unique: true,
        dropDups: true,
      },
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
export default mongoose.models.User ?? mongoose.model('User', UserSchema);
