'use client';
import { useSession } from 'next-auth/react';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import Image from 'next/image';
import { postType } from '../blog/page';
import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
type Props = {};
export default function Dashboard({}: Props) {
  const [posts, setPosts] = useState<postType[]>([]);
  const session = useSession();
  const router = useRouter();
  const fetcher = async (...args: [RequestInfo, RequestInit?]) => {
    const res = await fetch(...args);
    const data = await res.json();
    setPosts(data);
    return data;
  };
  const { isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?username=${session.data?.user?.name}`,
    fetcher,
  );
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      username: session.data?.user?.name as string,
      title: (e.target as unknown as any)[0].value,
      description: (e.target as unknown as any)[1].value,
      img: (e.target as unknown as any)[2].value,
      content: (e.target as unknown as any)[3].value,
    };
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      const newPost = await res.json();
      setPosts(prev => [...prev, newPost]);
      (e.target as unknown as any).reset();
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (id: number) => {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    const filteredPosts = posts.filter(post => post._id !== id);
    setPosts(filteredPosts);
  };
  if (session.status === 'loading' || isLoading) return <h1>Loading...</h1>;
  if (session.status === 'unauthenticated')
    return router.push('/dashboard/login');
  return (
    <div className={styles.container}>
      <div className={styles.posts}>
        {posts?.map(post => (
          <Link
            href={`/blog/${post._id}`}
            className={styles.post}
            key={post._id}
          >
            <div className={styles.imgCont}>
              <Image src={post.img} alt='Posts image' fill={true} />
            </div>
            <h1 className={styles.postTitle}>{post.title}</h1>
            <span
              className={styles.delete}
              onClick={() => handleDelete(post._id as number)}
            >
              X
            </span>
          </Link>
        ))}
      </div>
      <form className={styles.new} onSubmit={handleSubmit}>
        <h1 className={styles.title}>add new post</h1>
        <input
          type='text'
          placeholder='Title'
          className={styles.input}
          required
        />
        <input
          type='text'
          placeholder='Description'
          className={styles.input}
          required
        />
        <input
          type='text'
          placeholder='Image'
          className={styles.input}
          required
        />
        <textarea
          placeholder='Content'
          className={styles.textArea}
          cols={30}
          rows={10}
          required
        />
        <button type='submit' className={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
}
