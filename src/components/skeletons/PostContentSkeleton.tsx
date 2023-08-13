import { Skeleton } from "@mantine/core";
import { motion } from "framer-motion";

function PostContentSkeleton() {
  return (
    <motion.div>
      <Header />
      <Title />
      <Body />
      <ContentInteractions />
    </motion.div>
  );
}

function Header() {
  return (
    <div className='flex items-center mb-4'>
      <Skeleton height={48} circle className='mr-2' />

      <div className='space-y-2'>
        <Skeleton height={17} width='200' />
        <Skeleton height={14} width='150' />
      </div>
    </div>
  );
}

function Title() {
  return <Skeleton height={30} />;
}

function Body() {
  return (
    <div className='mt-10 space-y-2'>
      <Skeleton height={18} />
      <Skeleton height={18} />
      <Skeleton height={18} width='50%' />
    </div>
  );
}

function ContentInteractions() {
  return (
    <div className='mt-8'>
      <Skeleton height={25} width={260} />
    </div>
  );
}

export default PostContentSkeleton;
