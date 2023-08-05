import Link from 'next/link';
import styles from './Navbar.module.scss';
import AuthButtons from '../AuthButtons/AuthButtons';
import { Suspense } from 'react';
type Props = {};
const links = [
  {
    id: 1,
    title: 'Home',
    url: '/',
  },
  {
    id: 2,
    title: 'Portfolio',
    url: '/portfolio',
  },
  {
    id: 3,
    title: 'Blog',
    url: '/blog',
  },
  {
    id: 4,
    title: 'About',
    url: '/about',
  },
  {
    id: 5,
    title: 'Contact',
    url: '/contact',
  },
  {
    id: 6,
    title: 'Dashboard',
    url: '/dashboard',
  },
];

export default function Navbar({}: Props) {
  return (
    <nav className={styles.container}>
      <Link href={'/'} className={styles.logo}>
        MekuX
      </Link>
      <div className={styles.links}>
        {links.map(link => (
          <Link href={link.url} key={link.id} className={styles.link}>
            {link.title}
          </Link>
        ))}
        <Suspense fallback={<div>Loading</div>}>
          <AuthButtons />
        </Suspense>
      </div>
    </nav>
  );
}
