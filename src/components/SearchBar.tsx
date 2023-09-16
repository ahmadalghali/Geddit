import { IconSearch } from "@tabler/icons-react";
import { Autocomplete } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCommunities } from "@/api/communities";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allCommunityNames, setAllCommunityNames] = useState<string[]>([]);
  const [autoCompleteData, setAutoCompleteData] = useState<string[]>([]);
  const searchBarRef = useRef<HTMLInputElement | null>(null);

  // optimise to fetch only once
  useEffect(() => {
    (async () => {
      const data = await getAllCommunities();
      setAllCommunityNames(data.map((community) => community.name));
    })();
  }, []);

  const navigate = useNavigate();

  const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      removeFocus();
      if (searchTerm.trim().length < 1) return;

      navigate(`/search?query=${searchTerm}`);
    }
  };

  const onSearchTermChanged = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);

    // const data = allCommunityNames.filter((name) => name.toLowerCase().startsWith(newSearchTerm.toLowerCase()));

    // if (newSearchTerm.trim().length < 1) {
    //   setAutoCompleteData([]);
    // } else {
    //   setAutoCompleteData(data);
    // }
  };

  const removeFocus = () => searchBarRef.current?.blur();

  return (
    <div className='flex items-center w-96 justify-center overflow-visible'>
      <Autocomplete
        ref={searchBarRef}
        icon={<IconSearch />}
        className='w-full'
        radius='xl'
        classNames={{ input: "rounded-full" }}
        placeholder='Search...'
        // nothingFound='No results.'
        limit={8}
        data={autoCompleteData}
        value={searchTerm}
        onItemSubmit={(item) => navigate(`/search?query=${item.value}`)}
        onKeyDown={(event) => handleKeyPress(event)}
        onChange={(newSearchTerm) => onSearchTermChanged(newSearchTerm)}
        hoverOnSearchChange
        onDropdownClose={() => removeFocus()}
      />
    </div>
  );
}

export default SearchBar;
