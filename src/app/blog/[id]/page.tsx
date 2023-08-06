import { notFound } from 'next/navigation';
import { postType } from '../page';
import styles from './page.module.scss';
import Image from 'next/image';
type Props = {
  params: { id: string };
};

async function getData(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) return notFound();
  return res.json();
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
            {post.body[0].toUpperCase() + post.body.slice(1)}
          </p>
          <div className={styles.author}>
            <Image
              src={`https://images.pexels.com/photos/23547/pexels-photo.jpg`}
              alt=''
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>John Doe</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={`https://images.pexels.com/photos/23547/pexels-photo.jpg`}
            alt='Blog image'
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur cum
          at suscipit iusto odio deserunt praesentium modi in quaerat aperiam
          blanditiis deleniti ipsa, doloremque tempore iste nulla dolorem sed
          vero ea? Aut quisquam quas ut quasi, vero molestias in. Natus
          doloremque soluta perspiciatis ipsam maxime voluptate accusantium
          eius, eaque et.
          `https://images.pexels.com/photos/23547/pexels-photo.jpg`
        </p>
      </div>
    </div>
  );
}
