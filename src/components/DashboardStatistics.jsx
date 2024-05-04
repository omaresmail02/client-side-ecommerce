import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import { useQuery } from "react-query";
import { getProductList } from "../services/apiProduct";
import TinyBarChart from "./BarChart";
import { getReviewsList } from "../services/apiReviews";
import { getUsersList } from "../services/apiUsers";

const DashboardStatistics = () => {
  const { data: productsList } = useQuery("products", getProductList);
  const { data: reviewsList } = useQuery("reviews", getReviewsList);
  const { data: usersList } = useQuery("users", getUsersList);

  const productData = productsList?.data?.map((product) => ({
    name: product?.attributes?.title,
    value: product?.attributes?.stock,
  }));

  const categoryCounts = {};

  productsList?.data?.forEach((product) => {
    const categoryName =
      product?.attributes?.category?.data[0]?.attributes?.title;

    if (!categoryCounts[categoryName]) {
      categoryCounts[categoryName] = 1;
    } else {
      categoryCounts[categoryName]++;
    }
  });

  const categoryData = Object.entries(categoryCounts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <Flex flexDir="column" gap="100px">
      <Flex justify="center" gap="5px" flexWrap="wrap">
        <Box
          bg="purple.600"
          rounded="md"
          color="white"
          p="4px"
          textAlign="center"
          _hover={{ bg: "purple.800" }}
          transition="0.3s"
        >
          <Text fontSize="lg">عدد المنتجات</Text>
          <Text fontSize="2xl">{productsList?.data?.length}</Text>
        </Box>
        <Box
          bg="purple.600"
          rounded="md"
          color="white"
          p="4px"
          textAlign="center"
          _hover={{ bg: "purple.800" }}
          transition="0.3s"
        >
          <Text fontSize="lg">عدد الفئات</Text>
          <Text fontSize="2xl">{categoryData?.length}</Text>
        </Box>

        <Box
          bg="purple.600"
          rounded="md"
          color="white"
          p="4px"
          textAlign="center"
          _hover={{ bg: "purple.800" }}
          transition="0.3s"
        >
          <Text fontSize="lg">عدد المستخدمين</Text>
          <Text fontSize="2xl">{usersList?.length}</Text>
        </Box>
        <Box
          bg="purple.600"
          rounded="md"
          color="white"
          p="4px"
          textAlign="center"
          _hover={{ bg: "purple.800" }}
          transition="0.3s"
        >
          <Text fontSize="lg">عدد المراجعات</Text>
          <Text fontSize="2xl">{reviewsList?.data?.length}</Text>
        </Box>
      </Flex>
      <Box w="100%" h="50vh">
        <Heading
          fontSize={{ base: "md", lg: "x-large" }}
          mb="40px"
          position="relative"
          display="inline-block"
        >
          عدد القطع المتوفرة من كل منتج
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
        <TinyBarChart data={productData} />
      </Box>
      <Box w="100%" h="50vh">
        <Heading
          fontSize={{ base: "md", lg: "x-large" }}
          mb="40px"
          position="relative"
          display="inline-block"
        >
          عدد المنتجات في كل فئة
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
        <TinyBarChart data={categoryData} />
      </Box>
    </Flex>
  );
};

export default DashboardStatistics;
