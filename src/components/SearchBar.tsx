import { IconSearch } from "@tabler/icons-react";
import { Autocomplete } from "@mantine/core";
import { useEffect, useState } from "react";
import { search } from "../api/communities";
import { Community } from "../types";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("cscareers");
  const [communities, setCommunities] = useState<Community[]>([]);
  const [results, setResults] = useState<string[]>([]);

  const handleKeyPress = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      const communitiesResponse = await search(searchTerm);
      setCommunities(communitiesResponse);
      const communityNames = communitiesResponse.map(
        (community) => community.name
      );
      if (searchTerm.length > 0 && communityNames.length == 0) {
        setResults(["No results."]);
      } else {
        setResults(communityNames);
      }
    }
  };

  useEffect(() => {
    if (communities.length < 1) {
      setResults([]);
    }
  }, [communities]);

  return (
    <div className="flex bg-red-200 p-2 w-80">
      <IconSearch />
      <Autocomplete
        placeholder="Search community..."
        data={results}
        value={searchTerm}
        onKeyDown={(event) => handleKeyPress(event)}
        onChange={(newSearchTerm) => setSearchTerm(newSearchTerm)}
      />
    </div>
  );
}

export default SearchBar;
