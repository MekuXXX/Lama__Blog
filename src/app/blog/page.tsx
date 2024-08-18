import connectDB from "@/utils/db/connectDB";
import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import Post from "@/models/Post";

type Props = {};

export type postType = {
  _id?: number;
  username: string;
  title: string;
  content: string;
  img: string;
  description: string;
};

export default async function Blog({}: Props) {
  await connectDB(process.env.MONGO_URI as string);
  const posts = await Post.find();

  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Blogs</h1>
      {posts.map((post) => (
        <Link href={`/blog/${post._id}`} className={styles.item} key={post._id}>
          <div className={styles.imgCont}>
            <Image
              priority={true}
              src={post.img}
              alt="Category image"
              className={styles.img}
              fill={true}
            />
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>
              {post.title[0].toUpperCase() + post.title.slice(1)}
            </h1>
            <p className={styles.desc}>
              {post.description?.[0].toUpperCase() + post.description?.slice(1)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
