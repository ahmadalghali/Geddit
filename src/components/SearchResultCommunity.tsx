import { Avatar } from "@mantine/core";
import { Community } from "../types";
import { IconBrandReddit } from "@tabler/icons-react";
import Constants from "../constants";
type Props = {
  community: Community;
};

function SearchResultCommunity({ community }: Props) {
  return (
    <div className='flex rounded-md p-3 space-x-3 items-center'>
      <Avatar size='lg' radius='xl' color='cyan' className='mt-3'>
        <IconBrandReddit size='40' />
      </Avatar>

      <div className=''>
        <h4 className='font-bold'>
          {Constants.PREFIX_COMMUNITY}/{community.name}
        </h4>
        <p className='text-sm text-gray-500'>{community.description}</p>
      </div>
    </div>
  );
}

export default SearchResultCommunity;
