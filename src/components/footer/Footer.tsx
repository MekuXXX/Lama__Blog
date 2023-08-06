import Image from 'next/image';
import styles from './Footer.module.scss';
type Props = {};
export default function Footer({}: Props) {
  return (
    <div className={styles.container}>
      <div>©2023 Lamamia. All rights reserved.</div>
      <div>
        <div className={styles.socials}>
          <Image
            src='/1.png'
            width={20}
            className={styles.icon}
            height={20}
            alt='MekuX Facebook'
          />
          <Image
            src='/2.png'
            width={20}
            className={styles.icon}
            height={20}
            alt='MekuX Facebook'
          />
          <Image
            src='/3.png'
            width={20}
            className={styles.icon}
            height={20}
            alt='MekuX Facebook'
          />
          <Image
            src='/4.png'
            width={20}
            className={styles.icon}
            height={20}
            alt='MekuX Facebook'
          />
        </div>
      </div>
    </div>
  );
}
