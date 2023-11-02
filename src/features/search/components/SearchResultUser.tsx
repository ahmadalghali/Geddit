import { Avatar, Button } from "@mantine/core";
import { IconBrandReddit } from "@tabler/icons-react";
import { Constants } from "@/lib/constants";
import { UserDTO } from "@/types/dtos";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
type Props = {
  user: UserDTO;
};

function SearchResultUser({ user }: Props) {
  const handleFollowClicked = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    alert("followed");
  };
  return (
    <Link to={`/${Constants.PREFIX_USER}${user.username}`}>
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
          //@ts-ignore
          sx={{
            fontWeight: "800",
          }}
          radius={"xl"}
          onClick={handleFollowClicked}
        >
          FOLLOW
        </Button>
      </motion.div>
    </Link>
  );
}

export default SearchResultUser;
