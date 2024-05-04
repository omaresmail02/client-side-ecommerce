import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { deleteItem } from "../app/features/favoriteSlice";
import { HiEye, HiTrash } from "react-icons/hi2";
import { Link } from "react-router-dom";

const FavoriteItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <Flex
      key={item.id}
      alignItems="center"
      borderWidth="1px"
      borderRadius="md"
      borderColor={"purple.600"}
      p="2"
      mb="2"
      justify={"space-between"}
      boxShadow="md"
    >
      <Flex justify={"space-between"} align={"center"} gap={4}>
        <Image
          src={item.attributes?.thumbnail?.data?.attributes?.url}
          alt={item.attributes.title}
          boxSize="100px"
          objectFit="cover"
          rounded={"sm"}
        />
        <Box>
          <Heading fontSize="large" fontWeight="bold">
            {item.attributes.title}
          </Heading>
          <Text fontSize="large" fontWeight="bold">
            ${item.attributes.price}
          </Text>
        </Box>
      </Flex>
      <Flex gap={3}>
        <Button
          backgroundColor={"purple.600"}
          color="white"
          _hover={{ backgroundColor: "purple.800" }}
          as={Link}
          to={`/products/${item.id}`}
        >
          <HiEye />
        </Button>
        <Button
          backgroundColor={"red.600"}
          color="white"
          _hover={{ backgroundColor: "red.800" }}
          onClick={() => dispatch(deleteItem(item.id))}
        >
          <HiTrash />
        </Button>
      </Flex>
    </Flex>
  );
};

export default FavoriteItem;
