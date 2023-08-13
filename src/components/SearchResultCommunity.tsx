import { Avatar } from "@mantine/core";
import { IconBrandReddit } from "@tabler/icons-react";
import { Constants } from "@/lib/constants";
import { CommunitySummaryDTO } from "@/types/dtos";
import { motion } from "framer-motion";
type Props = {
  community: CommunitySummaryDTO;
};

function SearchResultCommunity({ community }: Props) {
  return (
    <motion.div className='flex rounded-md p-3 space-x-3 items-center'>
      <Avatar size='lg' radius='xl' color='cyan' className='mt-3'>
        <IconBrandReddit size='40' />
      </Avatar>

      <div className=''>
        <h4 className='font-bold'>
          {Constants.PREFIX_COMMUNITY}
          {community.name}
        </h4>
        <p className='text-sm text-gray-500'>{community.description}</p>
      </div>
    </motion.div>
  );
}

export default SearchResultCommunity;
