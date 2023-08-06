import Link from 'next/link';
import styles from './page.module.scss';
type Props = {};
export default function Portfolio({}: Props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Choose a gallery</h1>
      <div className={styles.items}>
        <Link href={`portfolio/illustrations`} className={styles.item}>
          <span className={styles.title}>Illustrations</span>
        </Link>
        <Link href={`portfolio/websites`} className={styles.item}>
          <span className={styles.title}>Websites</span>
        </Link>
        <Link href={`portfolio/applications`} className={styles.item}>
          <span className={styles.title}>Application</span>
        </Link>
      </div>
    </div>
  );
}
