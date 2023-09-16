import { Avatar, Button } from "@mantine/core";
import { IconBrandReddit } from "@tabler/icons-react";
import { Constants } from "@/lib/constants";
import { UserDTO } from "@/types/dtos";
import { motion } from "framer-motion";
type Props = {
  user: UserDTO;
};

function SearchResultUser({ user }: Props) {
  const handleFollowClicked = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    alert("followed");
  };
  return (
    <motion.div className='flex rounded-md p-3 items-center'>
      <Avatar size='lg' radius='xl' color='red'>
        <IconBrandReddit size='35' />
      </Avatar>

      <div className='ml-3'>
        <h4 className='font-bold'>
          {Constants.PREFIX_USER}
          {user.username}
        </h4>
      </div>
      <Button
        className='ml-auto'
        classNames={{ root: "text-sm" }}
        sx={{
          fontWeight: "800",
        }}
        radius={"xl"}
        onClick={handleFollowClicked}
      >
        FOLLOW
      </Button>
    </motion.div>
  );
}

export default SearchResultUser;
