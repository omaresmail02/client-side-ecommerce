import { Box, Button, Grid, Heading } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getCategoriesList } from "../services/apiCategories";
import { Link } from "react-router-dom";

const BrowseByCategory = () => {
  const { data } = useQuery("categories", getCategoriesList);
  const { categories, isLoading } = data;
  return (
    <Box p={30} borderTop="1px solid" borderBottom="1px solid">
      <Heading fontSize={"x-large"}>استكشف التصنيفات</Heading>
      <Grid
        my={"30"}
        templateColumns={"repeat(auto-fill, minmax(110px, 1fr))"}
        gap={"3"}
      >
         {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <Box key={index}>
                <Button boxSize={"110px"} isLoading />
              </Box>
            ))
          : categories.map((category) => (
              <Link key={category.id} to={`/?category_id=${category.id}`}>
                <Button boxSize={"110px"} variant="outline">
                  {category.title}
                </Button>
              </Link>
            ))}
      </Grid>
    </Box>
  );
};

export default BrowseByCategory;
