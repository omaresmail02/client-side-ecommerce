import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./ProductCard";
import { useQuery } from "react-query";
import { getProductList } from "../services/apiProduct";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  const { data } = useQuery("products", getProductList);

  return (
    <Box>
      <Flex justify={"space-between"} align={"center"}>
        <Heading
          fontSize={{ base: "large", lg: "x-large" }}
          my="40px"
          position="relative"
          display="inline-block"
        >
          كل المنتجات
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
        <Button
          as={Link}
          to={"/products"}
          my="40px"
          backgroundColor="purple.600"
          color="white"
          _hover={{ backgroundColor: "purple.800" }}
          p={{ base: "2", lg: "4" }}
          fontSize="small"
        >
          اظهر كل المنتجات
        </Button>
      </Flex>
      <Box>
        <Slider {...settings} arrows={false} rtl variableHeight>
          {data?.data?.map((product) => (
            <Box key={product.id} p={2} my="20px" height="100%">
              <ProductCard {...product} />
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default ProductCarousel;
