import { Skeleton } from "@mantine/core";

type Props = {
  count: number;
};

function SearchResultSkeleton({ count }: Props) {
  return (
    <div className='space-y-5'>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className='flex items-center p-3 w-full'>
          <Skeleton height={54} circle className='mr-3 flex-shrink-0' />
          <div className='space-y-2 w-full'>
            <Skeleton height={20} width='150' />
            <Skeleton height={15} width='80%' />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResultSkeleton;
