'use client';
import { ThemeContextType, useTheme } from '@/context/ThemeContext';
import styles from './ModeButton.module.scss';
type Props = {};
type modeType = 'light' | 'dark';
export default function ModeButton({}: Props) {
  const { mode, toggle }: ThemeContextType = useTheme();
  return (
    <div className={styles.container} onClick={toggle}>
      <div className={styles.icon}>D</div>
      <div className={styles.icon}>L</div>
      <div
        className={styles.ball}
        style={mode === 'light' ? { left: '0.125rem' } : { right: '0.125rem' }}
      ></div>
    </div>
  );
}
