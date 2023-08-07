'use client';
import Link from 'next/link';
import styles from './Navbar.module.scss';
import { Suspense, useEffect, useRef, useState } from 'react';
import ModeButton from '../modeButton/ModeButton';
import { signOut, useSession } from 'next-auth/react';
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
  const [active, setActive] = useState<boolean>(false);
  const session = useSession();
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Add click event listener to the documentvscode-file://vscode-app/c:/Users/MekuX/AppData/Local/Programs/Microsoft%20VS%20Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      // Clean up the event listener on unmount
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <nav className={styles.container}>
      <Link href={'/'} className={styles.logo}>
        MekuX
      </Link>
      <div className={styles.rightSide}>
        <ModeButton />
        <div className={`${styles.links} ${active ? styles.active : ''}`}>
          {links.map(link => (
            <Link href={link.url} key={link.id} className={styles.link}>
              {link.title}
            </Link>
          ))}
        </div>
        {session.status === 'authenticated' && (
          <button className={styles.logout} onClick={() => signOut()}>
            Logout
          </button>
        )}

        <div
          className={styles.menu}
          onClick={() => setActive(prev => !prev)}
          ref={menuRef}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='1em'
            height='1em'
            viewBox='0 0 24 24'
          >
            <path
              fill='currentColor'
              d='M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12L21 8.41L19.59 7l-5 5l5 5L21 15.59z'
            ></path>
          </svg>
        </div>
      </div>
    </nav>
  );
}
