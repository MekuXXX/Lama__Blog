import Button from '@/components/button/Button';
import styles from './page.module.scss';
import Image from 'next/image';
import { items } from './data';
import { IndexInfo } from 'typescript';
import { notFound } from 'next/navigation';
type Props = {
  params: {
    category: string;
  };
};
type CategoryType = {
  id: number;
  title: string;
  desc: string;
  image: string;
};
async function getData(cat: string | number) {
  const data = items[cat as keyof typeof items];
  if (!data) return notFound();
  return data;
}
export default async function Category({ params: { category } }: Props) {
  const data: CategoryType[] = await getData(category);
  return (
    <div className={styles.container}>
      <h1 className={styles.catTitle}>
        {category[0].toUpperCase() + category.slice(1)}
      </h1>
      {data.map(cat => (
        <div className={styles.item} key={cat.id}>
          <div className={styles.content}>
            <h1 className={styles.title}>{cat.title}</h1>
            <p className={styles.desc}>{cat.desc}</p>
            <Button text='See more' url='#' />
          </div>
          <div className={styles.imgCont}>
            <Image src={cat.image} alt='Category image' fill={true} />
          </div>
        </div>
      ))}
    </div>
  );
}
