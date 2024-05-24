import { Box, Container, Grid, Text } from "@chakra-ui/react";
import { HiOutlineArrowPath, HiOutlineTruck } from "react-icons/hi2";
import { MdOutlineHeadsetMic } from "react-icons/md";

const Benefits = () => {
  return (
    <Box mb="50px">
      <Container maxW="6xl">
        <Grid
          templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
          gap="20px"
        >
          <div data-aos="zoom-in-up" data-aos-duration="500">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap="10px"
              p="10px"
              bg="purple.600"
              color="white"
              rounded="lg"
              h="175px"
            >
              <HiOutlineTruck size={36} />
              <Text
                fontWeight="bold"
                fontSize={{ base: "medium", md: "large" }}
              >
                شحن مجانى
              </Text>
              <Text as="span">499 جنيه وأكثر</Text>
            </Box>
          </div>
          <div data-aos="zoom-in-up" data-aos-duration="500">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap="10px"
              p="20px"
              bg="purple.600"
              color="white"
              rounded="lg"
              h="175px"
            >
              <HiOutlineArrowPath size={36} />
              <Text
                fontWeight="bold"
                fontSize={{ base: "medium", md: "large" }}
              >
                إرجاع مجاني
              </Text>
              <Text as="span">خلال 30 يوم</Text>
            </Box>
          </div>
          <div data-aos="zoom-in-up" data-aos-duration="500">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap="10px"
              p="20px"
              bg="purple.600"
              color="white"
              rounded="lg"
              h="175px"
            >
              <MdOutlineHeadsetMic size={36} />
              <Text
                fontWeight="bold"
                fontSize={{ base: "medium", md: "large" }}
              >
                خدمة عملاء
              </Text>
              <Text as="span">
                كل يوم من السبت للخميس من 10:00 صباحًا حتى 07:00 مساءً
              </Text>
            </Box>
          </div>
        </Grid>
      </Container>
    </Box>
  );
};

export default Benefits;
