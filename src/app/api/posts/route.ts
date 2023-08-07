import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/utils/db/connectDB';
import Post from '@/models/Post';
export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const username = url.searchParams.get('username');
  try {
    await connectDB(process.env.MONGO_URI as string);
    const posts = username ? await Post.find({ username }) : await Post.find();
    return new NextResponse(JSON.stringify(posts) as BodyInit, { status: 200 });
  } catch (err) {
    return new NextResponse(err as BodyInit, {
      status: 500,
    });
  }
};
export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const newPost = new Post(body);
  try {
    await connectDB(process.env.MONGO_URI as string);
    await newPost.save();
    return new NextResponse(JSON.stringify(newPost) as BodyInit, {
      status: 200,
    });
  } catch (err) {
    // 'Server error please try again later'
    return new NextResponse(err as BodyInit, {
      status: 500,
    });
  }
};
