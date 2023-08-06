import Link from 'next/link';
import styles from './Button.module.scss';
type Props = {
  text: string;
  url: string;
};
export default function Button({ url, text }: Props) {
  return (
    <Link href={url}>
      <div className={styles.button}>{text}</div>
    </Link>
  );
}
