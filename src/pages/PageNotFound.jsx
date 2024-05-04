import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" mt={20}>
      <Heading as="h1" size="xl">
        404 - Page Not Found
      </Heading>
      <Text mt={4}>Sorry, the page you are looking for does not exist.</Text>
      <Button
        backgroundColor="purple.600"
        color="white"
        size="large"
        p="5"
        _hover={{ backgroundColor: "purple.800" }}
        onClick={() => navigate(-1)}
      >
        &larr; Go back
      </Button>
    </Box>
  );
};

export default NotFoundPage;
