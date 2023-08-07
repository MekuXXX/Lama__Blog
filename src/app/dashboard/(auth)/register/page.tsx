'use client';
import Link from 'next/link';
import styles from './page.module.scss';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
type Props = {};
export default function Register({}: Props) {
  const [err, setErr] = useState<boolean>(false);
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name: (e.target as unknown as any)[0].value,
      email: (e.target as unknown as any)[1].value,
      password: (e.target as unknown as any)[2].value,
    };
    try {
      const res = await fetch(`/api/auth/register`, {
        method: 'POST',
        headers: { 'Cotent-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      res.status === 201 &&
        router.push('/dashboard/login?success=Acount has been created');
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Username'
          className={styles.input}
          required
        />
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
          Register
        </button>
      </form>
      {err && <p className={styles.err}>Something went wrong!!</p>}
      <Link href={`/dashboard/login`} className={styles.login}>
        Login
      </Link>
    </div>
  );
}
