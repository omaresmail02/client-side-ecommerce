import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Image } from "@chakra-ui/react";
import { useEffect } from "react";

import sliderImg1 from "../assets/phones.webp";
import sliderImg2 from "../assets/electrical-devices.jpg";
import sliderImg3 from "../assets/laptops.jpg";

const HomeSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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

  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = `
      .slick-dots li button:before {
        font-size: 15px; /* Increase the size of the dots */
        color: #6B46C1;
      }
      .slick-dots li.slick-active button:before {
        font-size: 15px; /* Increase the size of the active dot */
        color: #6B46C1;
      }
    `;
    document.head.appendChild(styleTag);

    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <Slider {...settings} arrows={false} rtl>
      <Box>
        <Image src={sliderImg1} objectFit="cover" height="500px" width="100%" />
      </Box>
      <Box>
        <Image src={sliderImg2} objectFit="cover" height="500px" width="100%" />
      </Box>
      <Box>
        <Image src={sliderImg3} objectFit="cover" height="500px" width="100%" />
      </Box>
    </Slider>
  );
};

export default HomeSlider;
