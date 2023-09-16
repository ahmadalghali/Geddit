import { Avatar, Button } from "@mantine/core";
import { IconBrandReddit } from "@tabler/icons-react";
import { Constants } from "@/lib/constants";
import { CommunitySummaryDTO } from "@/types/dtos";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
type Props = {
  community: CommunitySummaryDTO;
};

function SearchResultCommunity({ community }: Props) {
  const handleJoinClicked = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    alert("joined");
  };
  return (
    <Link to={`/${Constants.PREFIX_COMMUNITY}${community.name}`}>
      <motion.div className='flex rounded-md p-3 items-center '>
        <Avatar size='lg' radius='xl' color='cyan'>
          <IconBrandReddit size='35' />
        </Avatar>

        <div className='ml-3 mr-1'>
          <h4 className='font-bold'>
            {Constants.PREFIX_COMMUNITY}
            {community.name}
          </h4>
          <p className='text-xs text-gray-500'>{community.description}</p>
        </div>
        <Button
          className='ml-auto'
          sx={{
            fontWeight: "800",
          }}
          radius={"xl"}
          onClick={handleJoinClicked}
        >
          JOIN
        </Button>
      </motion.div>
    </Link>
  );
}

export default SearchResultCommunity;
