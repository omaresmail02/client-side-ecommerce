import { Button, HStack } from "@chakra-ui/react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <HStack spacing="2" mt="4" justifyContent="center" my="15px">
      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index}
          bg={index + 1 === currentPage ? "purple.600" : "gray.600"}
          _hover={{
            bg: index + 1 === currentPage ? "purple.800" : "gray.800",
          }}
          color="white"
          onClick={() => handleClick(index + 1)}
        >
          {index + 1}
        </Button>
      ))}
    </HStack>
  );
};

export default Pagination;
