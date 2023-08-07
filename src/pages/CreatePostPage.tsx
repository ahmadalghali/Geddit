import { forwardRef, useEffect, useState } from "react";
import { Community } from "../types";
import { Avatar, Button, Group, Select, Text, TextInput, Textarea } from "@mantine/core";
import { IconBrandReddit, IconX } from "@tabler/icons-react";
import Constants from "../constants";
import { createPost } from "../api/posts";
import { getAllCommunities } from "../api/communities";
import { useNavigate } from "react-router";
import { CreatePostDTO } from "../types/dto";
import { notifications } from "@mantine/notifications";

// TODO: extract select component and logic

function CreatePostPage() {
  const [allCommunities, setAllCommunities] = useState<Community[]>([]);
  const [selectData, setSelectData] = useState<SelectItemType[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<Community>();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submittable, setSubmittable] = useState(false);
  const [selectedItemValue] = useState<string | null>();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllCommunities = async () => {
      const communities = await getAllCommunities();
      setAllCommunities(communities);

      const selectData = mapCommunitiesToSelectData(communities);
      setSelectData(selectData);
    };

    fetchAllCommunities();
  }, []);

  const mapCommunitiesToSelectData = (communities: Community[]): SelectItemType[] => {
    return communities.map((community): SelectItemType => {
      return {
        label: Constants.PREFIX_COMMUNITY + "/" + community.name,
        description: community.description,
        value: community.name,
      };
    });
  };

  const handleSelectChange = (newValue: string | null) => {
    const selectedCommunity = allCommunities.find((community) => community.name == newValue)!;

    setSelectedCommunity(selectedCommunity);
  };

  useEffect(() => {
    if (selectedCommunity == null || selectedCommunity == undefined) {
      setSubmittable(false);
      return;
    }

    if (title.trim().length == 0) {
      setSubmittable(false);
      return;
    }
    setSubmittable(true);
  }, [title, selectedCommunity]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createPostDTO: CreatePostDTO = {
      title: title.trim(),
      body: body.trim(),
      author: "Ahmad", // TODO: use real user
    };
    const success = await createPost(selectedCommunity!.name, createPostDTO);

    if (success) {
      notifications.show({ message: "Your post is now live!", color: "green" });
      navigate("/");
    } else {
      notifications.show({
        message: "Something went wrong, please try again.",
        color: "red",
      });
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className='flex items-center justify-between'>
        <IconX size={"40"} onClick={() => navigate("/")} className='cursor-pointer' />
        <Button type='submit' radius={"xl"} disabled={!submittable}>
          POST
        </Button>
      </div>
      <div className='mt-5 space-y-5'>
        <Select
          placeholder='Select community'
          itemComponent={SelectItem}
          data={selectData}
          searchable
          maxDropdownHeight={400}
          nothingFound='No communities found'
          filter={(value, item) =>
            item.label!.toLowerCase().includes(value.toLowerCase().trim()) ||
            item.description.toLowerCase().includes(value.toLowerCase().trim())
          }
          value={selectedItemValue}
          onChange={handleSelectChange}
        />

        <TextInput placeholder='Enter title' value={title} onChange={(e) => setTitle(e.target.value)} />

        <Textarea placeholder='Body text' minRows={10} value={body} onChange={(e) => setBody(e.target.value)} />
      </div>
    </form>
  );
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(({ label, description, ...others }: ItemProps, ref) => (
  <div ref={ref} key={label} {...others}>
    <Group noWrap>
      <Avatar size='lg' radius='xl' color='dark'>
        <IconBrandReddit size='40' />
      </Avatar>

      <div>
        <Text size='sm'>{label}</Text>
        <Text size='xs' opacity={0.65}>
          {description}
        </Text>
      </div>
    </Group>
  </div>
));

type SelectItemType = {
  label: string;
  value: string;
  description: string;
};

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  description: string;
}

export default CreatePostPage;
