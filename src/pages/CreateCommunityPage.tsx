import { Button, TextInput, Textarea } from "@mantine/core";
import { useState } from "react";
import { createCommunity } from "@/api/communities";
import { CreateCommunityDTO } from "@/types/dtos";
import PageTitle from "@/components/PageTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { Constants } from "@/lib/constants";
import { useNavigate } from "react-router-dom";

type Inputs = {
  communityName: string;
  description: string;
};

function CreateCommunityPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<Inputs>();

  const [, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async ({ communityName, description }) => {
    setIsSubmitting(true);

    const createCommunityDTO: CreateCommunityDTO = {
      name: communityName,
      description,
    };

    try {
      const createdCommunity = await createCommunity(createCommunityDTO);
      // await addArtificialDelay(1);

      if (createdCommunity) {
        notifications.show({
          color: "green",
          title: "Your community has been created!",
          message: "",
          icon: <IconCheck size='1rem' />,
          autoClose: 4000,
        });

        navigate(`/${Constants.PREFIX_COMMUNITY}${createdCommunity.name}`);
      } else {
        notifications.show({
          message: "Oops... something went wrong, please try again.",
          color: "red",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <PageTitle>Create a community</PageTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          className='mb-5'
          placeholder='Community name'
          label='Community name'
          withAsterisk
          error={errors.communityName && errors.communityName.message}
          icon={<p className='text-[.95rem] text-gray-500 font-bold tracking-widest w-2'>g/</p>}
          iconWidth={25}
          {...register("communityName", { required: true, maxLength: 21, minLength: 3 })}
        />
        <Textarea
          placeholder='Description'
          label='Description'
          withAsterisk
          error={errors.description && errors.description.message}
          minRows={3}
          {...register("description", { maxLength: 300, required: true })}
        />
        <Button
          type='submit'
          className='mt-5 float-right transition-all duration-300'
          radius={"xl"}
          disabled={!isValid}
        >
          Create community
        </Button>
      </form>
    </>
  );
}

export default CreateCommunityPage;
