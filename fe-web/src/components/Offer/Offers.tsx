import styles from '@/styles/Home.module.css';
import { Button, Text } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
const Offers = ({ posts }: any) => {
  // console.log(posts);
  return (
    <div className="w-full m-auto px-20 flex gap-1 items-center flex-wrap justify-center">
      {posts.map((post: any, index: number) => (
        <div
          className="flex border-[1px] border-gray-400 p-6 rounded-md mb-8 w-1/3 mr-5"
          key={index}
        >
          <Text
            css={{
              padding: '0.25rem 0.75rem',
              fontSize: '12px',
            }}
          >
            {'1'}
          </Text>
          <Link href={`/post/${post.address}`} className="cursor-pointer">
            <p className="truncate text-xl text-black font-medium mb-2">
              {post?.title}
            </p>

            <img
              src={post?.nftImg as string}
              alt="Default Image"
              width={500}
              height={500}
              objectFit="cover"
            />
            <Text
              css={{
                padding: '0 0.75rem',
                fontSize: '20px',
                margin: '8px 0',
                color: '#F9153E',
                fontWeight: 700,
              }}
            ></Text>
          </Link>
          <Button
            auto
            bordered={true}
            onClick={() => {
              console.log('ok');
            }}
          >
            Donate
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Offers;
