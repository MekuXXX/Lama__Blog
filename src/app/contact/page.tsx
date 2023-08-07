/* eslint-disable react/no-unescaped-entities */
import Button from '@/components/button/Button';
import styles from './page.module.scss';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Learn NextJS',
};

type Props = {};
export default function Contact({}: Props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Let's Keep in Touch</h1>
      <div className={styles.content}>
        <div className={styles.imgCont}>
          <Image
            src={'/contact.png'}
            fill={true}
            alt='Contact image'
            className={styles.img}
          />
        </div>
        <form className={styles.form}>
          <input type='text' placeholder='Name' className={styles.input} />
          <input type='email' placeholder='Email' className={styles.input} />
          <textarea
            placeholder='Message'
            cols={30}
            rows={10}
            className={styles.textArea}
          />
          <Button url='#' text='Send' />
        </form>
      </div>
    </div>
  );
}
