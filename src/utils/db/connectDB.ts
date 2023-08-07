import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async (URI: string) => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
  } catch (err) {
    throw new Error(err as string);
  }
};

export default connectDB;
