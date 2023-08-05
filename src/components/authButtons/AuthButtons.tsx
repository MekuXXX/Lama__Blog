'use client';
import styles from './AuthButtons.module.scss';
type Props = {};
export default function AuthButtons({}: Props) {
  return (
    <button className={styles.logout} onClick={() => console.log('Logout')}>
      Logout
    </button>
  );
}
