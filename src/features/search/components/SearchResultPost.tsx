import { Avatar } from "@mantine/core";
import { IconBrandReddit } from "@tabler/icons-react";
import { Constants } from "@/lib/constants";
import { PostSummaryDTO } from "@/types/dtos";
import { motion } from "framer-motion";
import { since } from "@/lib/utils/date-time";
import { Link } from "react-router-dom";

type Props = {
  post: PostSummaryDTO;
};

function SearchResultPost({ post }: Props) {
  return (
    <motion.div className=''>
      <PostItem post={post} />
    </motion.div>
  );
}

// function PostsList({}: { posts: PostSummaryDTO[] }) {
//   const posts: PostSummaryDTO[] = [
//     {
//       id: "1",
//       title: "why react is king",
//       body: "here is why react won.... ange naleg nga ehhael g",
//       commentCount: 21,
//       communityName: "react",
//       upvotes: 7,
//       downvotes: 54,
//       createdDate: new Date().toISOString(),
//       authorUsername: "ahmad",
//     },
//     {
//       id: "2",
//       title: "how do i get my baby niece to stop screaming in my ear?",
//       commentCount: 21,
//       communityName: "parenting",
//       upvotes: 0,
//       downvotes: 5,
//       createdDate: new Date().toISOString(),
//       authorUsername: "ahmad",
//     },
//     {
//       id: "3",
//       title: "java is better than rust, then why is?",
//       body: "here is why react won.... ange naleg nga ehhael g",
//       commentCount: 21,
//       communityName: "react",
//       upvotes: 3,
//       downvotes: 54,
//       createdDate: new Date().toISOString(),
//       authorUsername: "ahmad",
//     },
//     {
//       id: "4",
//       title: "java is better than rgaeg g lebkgj bebg ust, then why is?",
//       body: "here is why react wo ngeal a\n\n n.... ange naleg nga ehhael g",
//       commentCount: 21,
//       communityName: "react",
//       upvotes: 3,
//       downvotes: 54,
//       createdDate: new Date().toISOString(),
//       authorUsername: "ahmad",
//     },
//     {
//       id: "5",
//       title: "java is better than rust, then why is?",
//       body: "here is why react wfamfl kennel nngeakln galengl knglae lk on.... ange naleg nga ehhael g",
//       commentCount: 21,
//       communityName: "react",
//       upvotes: 3,
//       downvotes: 54,
//       createdDate: new Date().toISOString(),
//       authorUsername: "ahmad",
//     },
//     {
//       id: "6",
//       title: "java is better than rust, then why is?",
//       body: "here is why react wfamfl kennel nngeakln galengl knglae lk on.... ange naleg nga ehhael g",
//       commentCount: 21,
//       communityName: "react",
//       upvotes: 3,
//       downvotes: 54,
//       createdDate: new Date().toISOString(),
//       authorUsername: "ahmad",
//     },
//     {
//       id: "7",
//       title: "java is better than rust, then why is?",
//       body: "here is why react wfamfl kennel nngeakln galengl knglae lk on.... ange naleg nga ehhael g",
//       commentCount: 21,
//       communityName: "react",
//       upvotes: 3,
//       downvotes: 54,
//       createdDate: new Date().toISOString(),
//       authorUsername: "ahmad",
//     },
//     {
//       id: "8",
//       title: "java is better than rust, then why is?",
//       body: "here is why react wfamfl kennel nngeakln galengl knglae lk on.... ange naleg nga ehhael g",
//       commentCount: 21,
//       communityName: "react",
//       upvotes: 3,
//       downvotes: 54,
//       createdDate: new Date().toISOString(),
//       authorUsername: "ahmad",
//     },
//     {
//       id: "9",
//       title: "java is better than rust, then why is?",
//       body: "here is why react wfamfl kennel nngeakln galengl knglae lk on.... ange naleg nga ehhael g",
//       commentCount: 21,
//       communityName: "react",
//       upvotes: 3,
//       downvotes: 54,
//       createdDate: new Date().toISOString(),
//       authorUsername: "ahmad",
//     },
//   ];

//   return (
//     <ul>
//       {posts.map((post, index) => (
//         <>
//           {index < 5 && (
//             <li key={post.id}>
//               <PostItem post={post} />
//               <Divider size='lg' color='rgb(230, 230, 230)' />
//             </li>
//           )}
//         </>
//       ))}
//     </ul>
//   );
// }

function PostItem({ post }: { post: PostSummaryDTO }) {
  const formattedDate = since(post.createdDate);

  return (
    <Link to={`/${Constants.PREFIX_COMMUNITY}${post.communityName}/posts/${post.id}`}>
      <motion.div
        className='bg-white p-2 cursor-pointer sm:rounded-md hover:bg-zinc-100 transition-all'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className='flex items-center'>
          <Avatar size='md' radius='xl' className='mr-1' color={"green"}>
            <IconBrandReddit size='25' />
          </Avatar>
          <p className='font-semibold text-sm'>
            {Constants.PREFIX_COMMUNITY}
            {post.communityName}
            <span className='text-xs font-semibold text-gray-400'>
              <span className='mx-1'>·</span>
              <span>{formattedDate}</span>
            </span>
          </p>
        </div>
        <p className='font-medium'>{post.title}</p>
        <div className='flex text-xs font-semibold text-gray-500 gap-3 mt-3'>
          <p>147 upvotes</p>
          <p>74 comments</p>
        </div>
      </motion.div>
    </Link>
  );
}

export default SearchResultPost;
