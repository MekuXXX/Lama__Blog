import { notFound } from "next/navigation";
import { postType } from "../page";
import styles from "./page.module.scss";
import Image from "next/image";
import { Metadata } from "next";
import Post from "@/models/Post";
import connectDB from "@/utils/db/connectDB";
type Props = {
  params: { id: string };
};

async function getData(id: string) {
  await connectDB(process.env.MONGO_URI as string);
  const post = await Post.findById(id);
  return post;
}
export async function generateMetadata({ params }: { params: { id: string } }) {
  const post: postType = await getData(params.id);
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPost({ params: { id } }: Props) {
  const post: postType = await getData(id);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>
            {post.title[0].toUpperCase() + post.title.slice(1)}
          </h1>
          <p className={styles.desc}>
            {post.description?.[0].toUpperCase() + post.description?.slice(1)}
          </p>
          <div className={styles.author}>
            <Image
              src={post.img}
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>{post.username}</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={post.img}
            alt="Blog image"
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>{post.content}</p>
      </div>
    </div>
  );
}
