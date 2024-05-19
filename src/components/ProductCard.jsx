import {
  Card,
  CardBody,
  Text,
  Button,
  Image,
  Heading,
  CardFooter,
  CardHeader,
  Box,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { formatPrice, textSlicer } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../app/features/cartSlice";
import { addItem as addItemToWishlist } from "../app/features/wishlistSlice";
import { getProduct } from "../services/apiProduct";

import { useQuery } from "react-query";
import {
  HiInformationCircle,
  HiOutlineExclamationTriangle,
  HiOutlineHeart,
  HiOutlineShoppingBag,
} from "react-icons/hi2";

const ProductCard = (product) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);

  const toast = useToast();

  const handleAddToCart = () => {
    dispatch(addItem(data));
    const existingProduct = cart.cart.find((item) => item.id === data.id);
    !existingProduct &&
      toast({
        title: "المنتج تمت اضافته الى عربة التسوق بنجاح",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        icon: <HiOutlineShoppingBag size={20} />,
      });

    existingProduct &&
      toast({
        title: " المنتج موجود بالفعل في عربة التسوق",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        icon: <HiOutlineExclamationTriangle size={20} />,
      });
  };

  const handleAddToWishlist = () => {
    dispatch(addItemToWishlist(data));
    const existingProduct = wishlist.wishlist.find(
      (item) => item.id === data.id
    );
    !existingProduct &&
      toast({
        title: " المنتج تمت اضافته الى قائمة الرغبات بنجاح",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        icon: <HiOutlineHeart size={20} />,
      });

    existingProduct &&
      toast({
        title: " المنتج موجود بالفعل في قائمة الرغبات ",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        icon: <HiOutlineExclamationTriangle size={20} />,
      });
  };
  const { data } = useQuery(["product", product.id], () =>
    getProduct(product.id)
  );

  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card boxShadow="xl" height="100%" rounded="lg" p="8px">
        <CardHeader p="0" position="relative">
          {product.discountPercentage > 0 ? (
            <Text
              color="white"
              position="absolute"
              top="0"
              right="0"
              p="5px"
              bg="purple.600"
              roundedBottomLeft="lg"
              roundedTopRight="lg"
            >
              {`-${product.discountPercentage}%`}
            </Text>
          ) : null}
          <Box
            display="flex"
            flexDirection="column"
            gap="4px"
            color="white"
            position="absolute"
            top="0"
            left="0"
            p="5px"
            bg="purple.600"
            roundedBottomRight="lg"
            roundedTopLeft="lg"
          >
            <IconButton
              color="purple.600"
              _hover={{
                color: "white",
                bg: "purple.800",
              }}
              bg="white"
              size="sm"
              rounded="lg"
              icon={<HiOutlineShoppingBag size="20" />}
              onClick={handleAddToCart}
            />
            <IconButton
              color="purple.600"
              _hover={{
                color: "white",
                bg: "purple.800",
              }}
              bg="white"
              size="sm"
              rounded="lg"
              icon={<HiOutlineHeart size="20" />}
              onClick={handleAddToWishlist}
            />
          </Box>
          <Image
            src={product.thumbnail}
            alt={product.title}
            mx="auto"
            objectFit="fill"
            height="350px" // Set a fixed height for all images
            width="100%"
            rounded="lg"
          />
        </CardHeader>
        <CardBody
          p={0}
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading
            fontSize="larger"
            fontWeight="bold"
            p={3}
            mb={2}
            rounded="lg"
            textTransform="capitalize"
            wordBreak="break-word"
            // noOfLines="1"
          >
            {product.title}
          </Heading>

          <Text mb={3} textAlign="center">
            {textSlicer(product.description, 40)}
          </Text>
        </CardBody>
        <CardFooter
          justifyContent="space-between"
          alignItems="center"
          padding="0"
        >
          <Button
            as={Link}
            to={`/products/${product.id}`}
            backgroundColor="purple.600"
            color="white"
            size="sm"
            py="20px"
            px="10px"
            rightIcon={<HiInformationCircle size={20} />}
            _hover={{ backgroundColor: "purple.800" }}
            rounded="lg"
            aria-label="التفاصيل"
          >
            التفاصيل
          </Button>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap="10px"
          >
            <Text
              color={
                product.discountPercentage > 0 ? "purple.300" : "purple.600"
              }
              fontSize="large"
              fontWeight="semibold"
              textDecoration={
                product.discountPercentage > 0 ? "line-through" : "none"
              }
            >
              {formatPrice(product.price)}
            </Text>
            {product.discountPercentage > 0 ? (
              <Text color="purple.600" fontSize="large" fontWeight="semibold">
                {formatPrice(
                  product.price -
                    product.price * (product.discountPercentage / 100)
                )}
              </Text>
            ) : null}
          </Box>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
