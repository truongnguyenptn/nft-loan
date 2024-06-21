import Image from 'next/image';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import ElusivApp from '../components/ElusivApp';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <ElusivApp/>
    </>
  );
}