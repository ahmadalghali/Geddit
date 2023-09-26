import { Skeleton } from "@mantine/core";
import { motion } from "framer-motion";

type Props = {
  count: number;
};

function PostSummaryItemSkeleton({ count }: Props) {
  return (
    <motion.div className='space-y-5'>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='p-5 border-2 border-gray-100'>
          <Header />
          <Title />
          <Body />
          <ContentInteractions />
        </div>
      ))}
    </motion.div>
  );
}

function Header() {
  return (
    <div className='flex items-center mb-4'>
      <Skeleton height={35} circle className='mr-2' />
      <Skeleton height={15} width='150' />
    </div>
  );
}

function Title() {
  return <Skeleton height={30} />;
}

function Body() {
  return (
    <div className='mt-10 space-y-2'>
      <Skeleton height={12} />
      <Skeleton height={12} />
      <Skeleton height={12} width='50%' />
    </div>
  );
}

function ContentInteractions() {
  return (
    <div className='mt-5'>
      <Skeleton height={25} width={200} />
    </div>
  );
}

export default PostSummaryItemSkeleton;
