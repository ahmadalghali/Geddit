import { Skeleton } from "@mantine/core";
import { motion } from "framer-motion";

type Props = {
  count: number;
};

function CommentSkeleton({ count }: Props) {
  return (
    <motion.div className='space-y-5'>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='flex gap-5'>
          <Collapse />

          <div key={index} className='w-full'>
            <Header />
            <Body />
            <ContentInteractions />
          </div>
        </div>
      ))}
    </motion.div>
  );
}
function Collapse() {
  return <Skeleton height='200' w={3} />;
}

function Header() {
  return (
    <div className='flex items-center mb-4'>
      <Skeleton height={35} circle className='mr-2' />
      <Skeleton height={15} width='150' />
    </div>
  );
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
      <Skeleton height={25} width={220} />
    </div>
  );
}

export default CommentSkeleton;
