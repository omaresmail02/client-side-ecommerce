import axios from "axios";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

import ProductCardSkeleton from "../components/ProductCardSkeleton";

import {
  Card,
  CardBody,
  Text,
  Button,
  Image,
  Stack,
  Heading,
  CardFooter,
  Grid,
  Box,
  // useColorMode,
} from "@chakra-ui/react";

function ProductDetailsPage() {
  const { category } = useParams();

  const getCategoryProducts = async () => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/products?category=${category}&populate=thumbnail,category`
    );
    return data;
  };

  const { isLoading, data } = useQuery(
    ["products", category],
    getCategoryProducts
  );

  useEffect(() => {
    document.title = `Products Store | Category ${category} Page`;
  }, [category]);

  if (isLoading) return <ProductCardSkeleton />;

  const productsInCategory = data?.data?.filter((product) =>
    product.attributes.category.data.some(
      (cat) => cat.attributes.title === category
    )
  );

  const maxLength = 40; // Maximum length for the description

  return (
    <>
      <Heading
        fontSize={{ base: "large", lg: "xx-large" }}
        mt="20px"
        mx="40px"
        position="relative"
        display="inline-block"
      >
        {category}
        <Box
          position="absolute"
          bottom="-10px"
          left="50%"
          transform="translateX(-50%)"
          width="100%"
          height="3px"
          backgroundColor="purple.600"
        />
      </Heading>
      <Grid
        m={"30"}
        templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
        gap={"6"}
      >
        {productsInCategory.map((product) => {
          return (
            <Card boxShadow="2xl" rounded="md" key={product.id}>
              <CardBody p={0}>
                <Image
                  src={product.attributes?.thumbnail?.data?.attributes?.url}
                  alt={product.attributes.title}
                  mx={"auto"}
                  objectFit={"cover"}
                  borderTopRadius="md"
                  height="220px" // Set a fixed height for the image
                  width="100%" // Set a fixed width to fill the container
                />
                <Stack spacing="3" alignItems={"center"} p={4}>
                  <Heading
                    size="lg"
                    fontWeight={"bold"}
                    p={3}
                    mb={2}
                    rounded={"lg"}
                    textTransform={"capitalize"}
                  >
                    {product.attributes.title}
                  </Heading>
                  <Text>
                    {product.attributes.description.length > maxLength
                      ? `${product.attributes.description.substring(
                          0,
                          maxLength
                        )}...`
                      : product.attributes.description}
                  </Text>
                  <Text color="purple.600" fontSize="x-large">
                    ${product.attributes.price}
                  </Text>
                </Stack>
              </CardBody>
              <CardFooter justifyContent={"center"}>
                <Button
                  as={Link}
                  to={`/products/${product.id}`}
                  w="50%"
                  backgroundColor={"purple.600"}
                  color={"white"}
                  size={"xl"}
                  py="5"
                  _hover={{ backgroundColor: "purple.800" }}
                >
                  اظهر التفاصيل
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </Grid>
    </>
  );
}

export default ProductDetailsPage;
