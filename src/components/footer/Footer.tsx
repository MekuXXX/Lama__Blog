import Image from 'next/image';
import styles from './Footer.module.scss';
type Props = {};
export default function Footer({}: Props) {
  return (
    <div className={styles.container}>
      <div>©2023 Lamamia. All rights reserved.</div>
      <div>
        <div className={styles.imgCont}>
          <Image src='/1.png' fill={true} alt='Facebook' />
        </div>
      </div>
    </div>
  );
}
