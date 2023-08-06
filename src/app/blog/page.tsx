import styles from './page.module.scss';
import Image from 'next/image';
import Link from 'next/link';
type Props = {};
export type postType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) throw new Error('Failed fetch data');
  return res.json();
}

export default async function Blog({}: Props) {
  const data: postType[] = await getData();
  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>Blogs</h1>
      {data.map(post => (
        <Link href={`/blog/${post.id}`} className={styles.item} key={post.id}>
          <div className={styles.imgCont}>
            <Image
              src={`https://images.pexels.com/photos/23547/pexels-photo.jpg`}
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
              {post.body[0].toUpperCase() + post.body.slice(1)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
