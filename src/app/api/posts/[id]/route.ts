import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/utils/db/connectDB';
import Post from '@/models/Post';
type OtherType = {
  params: { id: string };
};
export const GET = async (request: NextRequest, { params }: OtherType) => {
  try {
    let { id } = params;
    await connectDB(process.env.MONGO_URI as string);
    const post = await Post.findById(id);
    return new NextResponse(JSON.stringify(post) as BodyInit, { status: 200 });
  } catch (err) {
    // 'Server error please try again later'
    return new NextResponse(err as BodyInit, {
      status: 500,
    });
  }
};
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { id } = params;
  try {
    await connectDB(process.env.MONGO_URI as string);
    await Post.findByIdAndDelete(id);
    return new NextResponse(undefined, {
      status: 204,
    });
  } catch (err) {
    // 'Server error please try again later'
    return new NextResponse(err as BodyInit, {
      status: 500,
    });
  }
};
