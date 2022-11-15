import { SearchIcon } from "@chakra-ui/icons";
import { HStack, Input, IconButton } from "@chakra-ui/react";
import { KeyboardEventHandler, useState } from "react";

export default function SearchBox({
  placeholder,
  search,
}: {
  placeholder: string;
  search: (text: string) => void;
}) {
  const [searchText, setSearchText] = useState("");

  const onKeyup: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      search(searchText);
    }
  };

  return (
    <>
      <HStack
        w="100%"
        spacing="10px"
        mb={10}
        pos="sticky"
        top={0}
        py="10px"
        bgColor="white"
        zIndex={1}
        p="5px"
      >
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder={placeholder}
          onKeyUp={onKeyup}
        />
        <IconButton
          aria-label="Search spreads"
          onClick={() => search(searchText)}
          icon={<SearchIcon />}
        />
      </HStack>
    </>
  );
}
