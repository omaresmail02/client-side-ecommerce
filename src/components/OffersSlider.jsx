import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Container, Heading, Image } from "@chakra-ui/react";

import sliderImg1 from "../assets/phones.webp";
import sliderImg2 from "../assets/electrical-devices.jpg";
import sliderImg3 from "../assets/laptops.jpg";

const OffersSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
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

  return (
    <Container maxW="6xl">
      <Box mb="50px">
        <Heading
          fontSize={{ base: "x-large", lg: "xx-large" }}
          mb="30px"
          position="relative"
          display="inline-block"
        >
          عروضنا
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
        <Box>
          <Slider {...settings} arrows={false} rtl>
            <Box rounded="lg">
              <Image
                src={sliderImg1}
                objectFit="cover"
                height="500px"
                width="100%"
                rounded="lg"
              />
            </Box>
            <Box>
              <Image
                src={sliderImg2}
                objectFit="cover"
                height="500px"
                width="100%"
                rounded="lg"
              />
            </Box>
            <Box>
              <Image
                src={sliderImg3}
                objectFit="cover"
                height="500px"
                width="100%"
                rounded="lg"
              />
            </Box>
          </Slider>
        </Box>
      </Box>
    </Container>
  );
};

export default OffersSlider;
