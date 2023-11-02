// import { useEffect, useState } from "react";
// import { Community } from "@/types/entities";
// import { Constants } from "@/lib/constants";
// import { getAllCommunities } from "@/api/communities";
// import { useNavigate } from "react-router";
// import { CommunitySummaryDTO, CreatePostDTO } from "@/types/dtos";
// import { notifications } from "@mantine/notifications";
// import { addArtificialDelay } from "@/lib/utils/network";
// import { createCommunityPost } from "@/api/community-posts";

// type Props = {
//   communityName?: string;
// };

function useCreatePost() {
  // const [allCommunities, setAllCommunities] = useState<Community[]>([]);
  // const [selectedCommunity, setSelectedCommunity] = useState<Community>();
  // const [title, setTitle] = useState("");
  // const [body, setBody] = useState("");

  // const [selectData, setSelectData] = useState<SelectItemType[]>([]);
  // const [submittable, setSubmittable] = useState(false);
  // const [selectedItemValue, setSelectedItemValue] = useState<string | null>();

  // const [isSubmitting, setIsSubmitting] = useState(false);

  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (communityName) {
  //     setSelectedItemValue(communityName);
  //   }
  // }, [communityName]);

  // useEffect(() => {
  //   const fetchAllCommunities = async () => {
  //     const communities = await getAllCommunities();
  //     setAllCommunities(communities);

  //     const selectData = mapCommunitiesToSelectData(communities);
  //     setSelectData(selectData);
  //   };

  //   fetchAllCommunities();
  // }, []);

  // const mapCommunitiesToSelectData = (communities: CommunitySummaryDTO[]): SelectItemType[] => {
  //   return communities.map((community): SelectItemType => {
  //     return {
  //       label: Constants.PREFIX_COMMUNITY + community.name,
  //       description: community.description,
  //       value: community.name,
  //     };
  //   });
  // };

  // const handleSelectChange = (newValue: string | null) => {
  //   const selectedCommunity = allCommunities.find((community) => community.name == newValue)!;

  //   setSelectedCommunity(selectedCommunity);
  // };

  // useEffect(() => {
  //   if (selectedCommunity == null || selectedCommunity == undefined) {
  //     setSubmittable(false);
  //     return;
  //   }

  //   if (title.trim().length == 0) {
  //     setSubmittable(false);
  //     return;
  //   }
  //   setSubmittable(true);
  // }, [title, selectedCommunity]);

  // const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   setIsSubmitting(true);

  //   const createPostDTO: CreatePostDTO = {
  //     title: title.trim(),
  //     body: body.trim(),
  //   };

  //   try {
  //     const createdPost = await createCommunityPost(selectedCommunity!.name, createPostDTO);
  //     await addArtificialDelay(1);

  //     if (createdPost) {
  //       notifications.show({
  //         color: "green",
  //         title: "Your post is now live!",
  //         message: "",
  //         autoClose: 4000,
  //       });
  //       navigate(`/${Constants.PREFIX_COMMUNITY}${createdPost.communityName}/posts/${createdPost.id}`);
  //     } else {
  //       notifications.show({
  //         message: "Something went wrong, please try again.",
  //         color: "red",
  //       });
  //     }
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return {};
}

// type SelectItemType = {
//   label: string;
//   value: string;
//   description: string;
// };

export default useCreatePost;
