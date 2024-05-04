import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import {
  clearCart,
  selectTotalPrice,
  selectTotalQuantity,
} from "../app/features/cartSlice";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function CartPage() {
  const cart = useSelector((state) => state.cart);
  const totalPrice = useSelector(selectTotalPrice);
  const totalQuantity = useSelector(selectTotalQuantity);

  const dispatch = useDispatch();

  return (
    <Box p="4">
      {cart.cart.length > 0 ? (
        <>
          <Heading
            fontSize={{ base: "large", lg: "xx-large" }}
            mb="20px"
            position="relative"
            display="inline-block"
          >
            عربة التسوق
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
          {cart.cart.map((item) => (
            <CartItem item={item} key={item.id} />
          ))}
          <Flex align={"center"} justify={"space-between"}>
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                الكمية: {totalQuantity}
              </Text>
              <Text fontSize="lg" fontWeight="bold">
                الاجمالي: ${totalPrice}
              </Text>
              <Button
                as={Link}
                to="/checkout"
                mt="4"
                backgroundColor="purple.600"
                color="white"
                size="large"
                p="3"
                _hover={{ backgroundColor: "purple.800" }}
              >
                الدفع
              </Button>
            </Box>
            <Button
              bg={"red.600"}
              color="white"
              size="large"
              p="3"
              _hover={{ backgroundColor: "red.800" }}
              onClick={() => dispatch(clearCart())}
            >
              مسح العربة
            </Button>
          </Flex>
        </>
      ) : (
        <Text fontWeight={"bold"} fontSize={"xx-large"} textAlign={"center"}>
          عربتك فارغة
        </Text>
      )}
    </Box>
  );
}

export default CartPage;
