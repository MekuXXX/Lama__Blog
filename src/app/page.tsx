import Button from '@/components/button/Button';
import styles from './page.module.scss';
import Image from 'next/image';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>
          Better design for your digital products
        </h1>
        <p className={styles.desc}>
          Turning your Idea into Reality. We bring together the teams from the
          global tech industry.
        </p>
        <Button url='/portfolio' text='See our work' />
      </div>
      <div className={`${styles.item} ${styles.imgCont}`}>
        <Image
          src='/hero.png'
          fill={true}
          alt='Home imagge'
          className={styles.img}
        />
      </div>
    </div>
  );
}
