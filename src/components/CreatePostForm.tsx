import { forwardRef, useEffect, useState } from "react";
import { Community } from "@/types/entities";
import { Avatar, Button, CloseButton, Group, LoadingOverlay, Select, Text, TextInput, Textarea } from "@mantine/core";
import { IconBrandReddit, IconCheck } from "@tabler/icons-react";
import { Constants } from "@/lib/constants";
import { createPost } from "@/api/community-posts";
import { getAllCommunities } from "@/api/communities";
import { useNavigate } from "react-router";
import { CreatePostDTO } from "@/types/dtos";
import { notifications } from "@mantine/notifications";
import { addArtificialDelay } from "@/lib/utils/network";
import { useForm, SubmitHandler, useController } from "react-hook-form";

type Inputs = {
  title: string;
  body: string;
  selectedCommunityName: string | null | undefined;
};

type Props = {
  onDismiss: () => void;
  communityName?: string;
};

function CreatePostForm({ communityName, onDismiss }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    setValue,
  } = useForm<Inputs>();

  const { field: selectedCommunityNameField } = useController({ name: "selectedCommunityName", control });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async ({ title, body, selectedCommunityName }) => {
    setIsSubmitting(true);

    const createPostDTO: CreatePostDTO = {
      title: title.trim(),
      body: body.trim(),
    };

    try {
      const createdPost = await createPost(selectedCommunityName!, createPostDTO);
      await addArtificialDelay(1);

      if (createdPost) {
        notifications.show({
          color: "green",
          title: "Your post is now live!",
          message: "",
          icon: <IconCheck size='1rem' />,
          autoClose: 4000,
        });
        navigate(`/${Constants.PREFIX_COMMUNITY}${createdPost.communityName}/posts/${createdPost.id}`);
      } else {
        notifications.show({
          message: "Something went wrong, please try again.",
          color: "red",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const [selectData, setSelectData] = useState<SelectItemType[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (communityName) {
      setValue("selectedCommunityName", communityName);
    }
  }, [communityName, setValue]);

  useEffect(() => {
    const fetchAllCommunities = async () => {
      const communities = await getAllCommunities();

      const selectData = mapCommunitiesToSelectData(communities);
      setSelectData(selectData);
    };

    fetchAllCommunities();
  }, []);

  const mapCommunitiesToSelectData = (communities: Community[]): SelectItemType[] => {
    return communities.map((community): SelectItemType => {
      return {
        label: Constants.PREFIX_COMMUNITY + community.name,
        description: community.description,
        value: community.name,
      };
    });
  };

  const handleSelectChange = (newValue: string | null) => {
    selectedCommunityNameField.onChange(newValue);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='relative'>
      <LoadingOverlay transitionDuration={100} loaderProps={{ size: "lg" }} visible={isSubmitting} />
      <div className='flex items-center justify-between'>
        <CloseButton onClick={onDismiss} size={"xl"} iconSize={30} radius={"xl"} color='gray' />
        <Button type='submit' radius={"xl"} disabled={!isValid}>
          POST
        </Button>
      </div>
      <div className='mt-5 space-y-5'>
        <Select
          disabled={communityName != null}
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
          value={selectedCommunityNameField.value}
          onChange={handleSelectChange}
        />

        <TextInput placeholder='Enter title' {...register("title", { required: true })} />

        <Textarea placeholder='Body text' minRows={10} {...register("body")} />
      </div>
    </form>
  );
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(({ label, description, ...others }: ItemProps, ref) => (
  <div ref={ref} key={label} {...others}>
    <Group noWrap>
      <Avatar size='lg' radius='xl' color='cyan'>
        <IconBrandReddit size='40' />
      </Avatar>

      <div>
        <Text size='md' className='font-semibold'>
          {label}
        </Text>
        <Text size='xs' className='font-medium' opacity={0.65}>
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

export default CreatePostForm;
