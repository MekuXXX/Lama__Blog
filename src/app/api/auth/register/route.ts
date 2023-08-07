import User from '@/models/User';
import connectDB from '@/utils/db/connectDB';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export const POST = async (req: NextRequest) => {
  const { name, email, password } = await req.json();
  await connectDB(process.env.MONGO_URI as string);
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    return new NextResponse('User has been created successfully', {
      status: 201,
    });
  } catch (err) {
    return new NextResponse((err as Error).message, { status: 500 });
  }
};
