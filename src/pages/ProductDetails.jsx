import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../app/features/cartSlice";
import { addItem as addItemToFavorite } from "../app/features/favoriteSlice";
import { HiArrowLeft } from "react-icons/hi2";

import { axiosInstance } from "../api/axios.config";

import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Reviews from "../components/Reviews";
import { useSelector } from "react-redux";
import { BsStarFill } from "react-icons/bs";

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goBack = () => navigate(-1);

  const handleAddToCart = () => {
    dispatch(addItem(data.data));
  };

  const handleAddToFavorite = () => {
    dispatch(addItemToFavorite(data.data));
  };

  const getProduct = async () => {
    const { data } = await axiosInstance.get(
      `/api/products/${id}?populate=thumbnail,category`
    );
    return data;
  };

  const { isLoading, data } = useQuery(["products", id], getProduct);

  useEffect(() => {
    document.title = `متجر التجارة الالكتروني | ${data?.data?.attributes?.title} `;
  }, [data]);

  const averageRating = useSelector((state) => state.averageRating);

  if (isLoading) return <ProductDetailsSkeleton />;

  return (
    <Box m={30}>
      <Box>
        <Heading
          fontSize={{ base: "large", lg: "xx-large" }}
          mb="20px"
          position="relative"
          display="inline-block"
        >
          {data?.data?.attributes.title}
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
        <Box
          borderWidth="1px"
          borderRadius="md"
          borderColor={"purple.600"}
          boxShadow="xl"
          p="4"
          mb="4"
        >
          <HStack
            spacing="4"
            justifyContent={"space-between"}
            gap={4}
            flexDirection={{ base: "column", lg: "row" }}
          >
            <Image
              src={data?.data?.attributes?.thumbnail?.data?.attributes?.url}
              alt={data.data.attributes.title}
              width={"50%"}
              objectFit={"fill"}
              rounded={"sm"}
            />
            <VStack align="start" justify="center" spacing="4">
              <Text fontSize="lg">{data.data.attributes.description}</Text>
              <Text fontSize="xl" fontWeight="bold">
                السعر: ${data.data.attributes.price}
              </Text>
              <Text fontSize="md">
                عدد القطع المتوفرة :{data.data.attributes.stock}
              </Text>
              <Text>
                التقييم :{" "}
                {averageRating === 0
                  ? "لايوجد مراجعات , كن اول المراجعين"
                  : averageRating}
              </Text>
              <Text as="span" display="flex" gap="1">
                {[...Array(Math.round(averageRating))].map((_, index) => (
                  <BsStarFill color="gold" key={index} />
                ))}
              </Text>
              <HStack spacing="4" flexDirection={{ base: "column", lg: "row" }}>
                <Button
                  backgroundColor="purple.600"
                  color="white"
                  size="large"
                  p="5"
                  _hover={{ backgroundColor: "purple.800" }}
                  onClick={handleAddToCart}
                >
                  اضافة الى العربة
                </Button>
                <Button
                  backgroundColor="purple.600"
                  color="white"
                  size="large"
                  p="5"
                  _hover={{ backgroundColor: "purple.800" }}
                  onClick={handleAddToFavorite}
                >
                  اضافة الى المفضلة
                </Button>
              </HStack>
            </VStack>
          </HStack>
        </Box>
      </Box>

      <Reviews productId={id} />

      <Button
        fontSize={"lg"}
        fontWeight={"bold"}
        cursor={"pointer"}
        onClick={goBack}
        mt={3}
        backgroundColor="purple.600"
        color="white"
        size="large"
        p="5"
        _hover={{ backgroundColor: "purple.800" }}
      >
        <HiArrowLeft />
        <Text>الرجوع!</Text>
      </Button>
    </Box>
  );
}

export default ProductDetailsPage;
