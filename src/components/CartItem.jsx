import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  decressItem,
  deleteItem,
  incressItem,
} from "../app/features/cartSlice";
import { HiTrash } from "react-icons/hi2";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <Flex
      key={item.id}
      alignItems="center"
      justify={"space-between"}
      borderWidth="1px"
      borderRadius="md"
      borderColor={"purple.600"}
      p="2"
      mb="2"
      gap={2}
      boxShadow="md"
    >
      <Flex gap="20px" flexDirection={{ base: "column", lg: "row" }}>
        <Image
          src={item.attributes?.thumbnail?.data?.attributes?.url}
          alt={item.attributes.title}
          boxSize="100px"
          objectFit="cover"
          rounded={"sm"}
        />
        <Box>
          <Heading fontSize="large">{item.attributes.title}</Heading>
          <Text fontSize="large" fontWeight="bold">
            ${item.attributes.price}
          </Text>
          <Flex align={"center"} justify={"space-between"} gap={4} mt={4}>
            <Button
              backgroundColor="purple.600"
              color="white"
              p="5"
              _hover={{ backgroundColor: "purple.800" }}
              onClick={() => dispatch(incressItem(item.id))}
            >
              +
            </Button>
            <Text>{item.quantity}</Text>
            <Button
              backgroundColor="purple.600"
              color="white"
              p="5"
              _hover={{ backgroundColor: "purple.800" }}
              onClick={() => dispatch(decressItem(item.id))}
            >
              -
            </Button>
          </Flex>
        </Box>
      </Flex>
      <Flex flexDirection={"column"} gap="10px" alignItems={"center"}>
        <Button
          backgroundColor="red.600"
          color="white"
          maxW={"120px"}
          _hover={{ backgroundColor: "red.800" }}
          onClick={() => dispatch(deleteItem(item.id))}
        >
          <HiTrash />
        </Button>
        <Box ml="auto">
          <Text fontWeight="bold">
            السعر الكلي :${item.attributes.price * item.quantity}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};

export default CartItem;
