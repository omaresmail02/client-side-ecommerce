// import { useState } from "react";
// import SearchInput from "./SearchInput";

// import SearchResults from "./SearchResults";
// const Search = () => {
//   const [searchResults, setSearchResults] = useState([]);

//   return (
//     <>
//       <SearchInput setSearchResults={setSearchResults} />
//       <SearchResults searchResults={searchResults} />
//     </>
//   );
// };

// export default Search;

import { useState } from "react";
import {
  Box,
  Input,
  InputGroup,
  useDisclosure,
  List,
  ListItem,
  Text,
  Divider,
  useColorMode,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getProductList } from "../services/apiProduct";
import { Link } from "react-router-dom";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { onToggle } = useDisclosure();

  const { data } = useQuery("products", getProductList);

  const searchData = (value) => {
    const results = data?.data?.filter((product) =>
      product?.attributes?.title?.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(results);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    searchData(value);
    onToggle(true);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    searchData([]);
    onToggle(false);
  };

  const bgColor = { light: "gray.100", dark: "gray.700" };
  const textColor = { light: "gray.800", dark: "gray.200" };
  const borderColor = { light: "gray.300", dark: "gray.600" };

  const { colorMode } = useColorMode();

  return (
    <Box position="relative">
      <InputGroup>
        <Input
          placeholder="ابحث عن منتجك..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          bg={"none"}
          color={"white"}
          _focus={{ outline: "2px solid purple.800" }}
          rounded={{ base: "none", md: "md" }}
          border="none"
        />
      </InputGroup>
      {searchQuery && (
        <Box
          position="absolute"
          top="100%"
          left="0"
          width="100%"
          boxShadow="md"
          borderRadius="md"
          overflow="hidden"
          zIndex="10"
          p="4"
          bg={bgColor[colorMode]}
          color={textColor[colorMode]}
          borderColor={borderColor[colorMode]}
          borderWidth="1px"
        >
          <List>
            {searchResults.map((result) => (
              <>
                <ListItem
                  key={result.id}
                  as={Link}
                  to={`/products/${result.id}`}
                  onClick={handleClearSearch}
                >
                  <Text fontWeight="bold" fontSize="md" p={2}>
                    {result.attributes.title}
                  </Text>
                </ListItem>
                <Divider />
              </>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default SearchComponent;
