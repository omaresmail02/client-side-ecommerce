import { Box, Stack } from "@chakra-ui/react";
import Categories from "../components/Categories";
import HomeSlider from "../components/Slider";
import HomeProductsSlider from "../components/HomeProductsSlider";
import SearchBar from "../components/Search";

const Home = () => {
  return (
    <Stack>
      <Box display={{ base: "block", md: "none" }} bg="purple.600">
        <SearchBar />
      </Box>
      <HomeSlider />
      <Box mx="10px">
        <Categories />
        <HomeProductsSlider />
      </Box>
    </Stack>
  );
};

export default Home;
