'use client';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

type Props = {};
export default function Login({}: Props) {
  const [err, setErr] = useState<boolean>(false);
  const router = useRouter();
  const session = useSession();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email: (e.target as unknown as any)[0].value,
      password: (e.target as unknown as any)[1].value,
    };
    signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: '/dashboard',
    });
  };
  if (session.status === 'loading') return <h1>Lodding...</h1>;
  if (session.status === 'authenticated') return router.push('/dashboard');
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='email'
          placeholder='Email'
          className={styles.input}
          required
        />
        <input
          type='password'
          placeholder='Password'
          className={styles.input}
          required
        />
        <button type='submit' className={styles.button}>
          Login
        </button>
      </form>
      {err && <p className={styles.err}>Something went wrong!!</p>}
      <div className={styles.others}>
        <Link href={`/dashboard/register`} className={styles.item}>
          Register
        </Link>
        <button onClick={() => signIn('github')} className={styles.item}>
          Github
        </button>
      </div>
    </div>
  );
}
