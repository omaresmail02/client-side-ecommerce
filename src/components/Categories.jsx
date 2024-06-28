import { Box, Button, Container, Grid, Heading, Skeleton } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getCategoriesList } from "../services/apiCategories"; // Adjust this import as per your actual API service
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Categories = () => {
  const { data, isLoading } = useQuery("categories", getCategoriesList);

  return (
    <Container maxW="6xl">
      <Box mb="50px">
        <Heading
          fontSize={{ base: "large", lg: "x-large" }}
          mb="30px"
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
        <Grid
          templateColumns={{
            base: "repeat(3, 1fr)",
            sm: "repeat(4, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap="20px"
        >
          {isLoading // Show loading skeleton while data is being fetched
            ? Array.from({ length: 16 }).map((_, index) => (
                <Box textAlign="center" key={index} rounded="lg">
                  <Skeleton p="10px" w="100%" />
                </Box>
              ))
            : data.map((category) => (
                <Box key={category.id}>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button
                      as={Link}
                      to={`/categories/${category.id}/`}
                      backgroundColor="purple.600"
                      color="white"
                      _hover={{ backgroundColor: "purple.800" }}
                      boxShadow="md"
                      p="10px"
                      w="100%"
                      whiteSpace="normal"
                      aria-label={category.title}
                    >
                      {category.title.toUpperCase()}
                    </Button>
                  </motion.div>
                </Box>
              ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Categories;
