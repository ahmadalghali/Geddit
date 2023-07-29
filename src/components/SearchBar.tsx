import { IconSearch } from "@tabler/icons-react";
import { Autocomplete } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (searchTerm.trim().length < 1) return;

      navigate(`/search?query=${searchTerm}`);
    }
  };

  return (
    <div className='flex items-center justify-center'>
      <Autocomplete
        icon={<IconSearch />}
        className='w-52 sm:w-80'
        classNames={{ input: "rounded-full" }}
        placeholder='Search community...'
        data={[]}
        value={searchTerm}
        onKeyDown={(event) => handleKeyPress(event)}
        onChange={(newSearchTerm) => setSearchTerm(newSearchTerm)}
      />
    </div>
  );
}

export default SearchBar;
