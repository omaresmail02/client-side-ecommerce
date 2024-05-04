import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getProductList } from "../services/apiProduct";
import { Link } from "react-router-dom";

const Categories = () => {
  const { data } = useQuery("products", getProductList);

  // Get unique categories
  const categoriesSet = new Set();
  data?.data?.forEach((product) => {
    product?.attributes?.category?.data?.forEach((cat) =>
      categoriesSet.add(cat.attributes.title)
    );
  });

  const uniqueCategories = Array.from(categoriesSet);

  return (
    <Box my="80px">
      <Heading
        fontSize={{ base: "large", lg: "x-large" }}
        mb="10px"
        position="relative"
        display="inline-block"
      >
        تسوق حسب الفئات
        <Box
          position="absolute"
          bottom="-5px"
          left="50%"
          transform="translateX(-50%)"
          width="100%"
          height="3px"
          backgroundColor="purple.600"
        />
      </Heading>
      <Flex
        justifyContent="center"
        gap="5px"
        overflowX="auto"
        sx={{
          "&::-webkit-scrollbar": {
            height: "8px",
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "purple.600",
            borderRadius: "8px",
            width: "10px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          minWidth: "100%", // Ensure that the Flex container is at least 100% wide
        }}
      >
        {uniqueCategories.map((category) => (
          <Box key={category} textAlign={"center"}>
            <Button
              as={Link}
              to={`/products/categories/${category}`}
              boxSize={{ base: "85px", lg: "125px" }}
              backgroundColor="purple.600"
              color="white"
              _hover={{ backgroundColor: "purple.800" }}
              boxShadow="md"
              my="20px"
              whiteSpace={"normal"}
            >
              {category}
            </Button>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Categories;
