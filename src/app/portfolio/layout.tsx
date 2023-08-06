import { ReactNode } from 'react';
import styles from './page.module.scss';
type Props = {
  children: ReactNode;
};
export default function layout({ children }: Props) {
  return (
    <div className={styles.layout}>
      <h1 className={styles.mainTitle}>Our Works</h1>
      {children}
    </div>
  );
}
