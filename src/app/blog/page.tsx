import styles from './page.module.scss';
import Image from 'next/image';
import Link from 'next/link';
type Props = {};
export type postType = {
  _id?: number;
  username: string;
  title: string;
  content: string;
  img: string;
  description: string;
};
async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed fetch data');
  return res.json();
}

export default async function Blog({}: Props) {
  const data: postType[] = await getData();
  console.log(data);
  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Blogs</h1>
      {data.map(post => (
        <Link href={`/blog/${post._id}`} className={styles.item} key={post._id}>
          <div className={styles.imgCont}>
            <Image
              priority={true}
              src={post.img}
              alt='Category image'
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
