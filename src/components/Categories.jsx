// import {
//   Box,
//   Button,
//   Container,
//   Flex,
//   Heading,
//   Skeleton,
// } from "@chakra-ui/react";
// import { useQuery } from "react-query";
// import { getProductList } from "../services/apiProduct";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const Categories = () => {
//   const { data, isLoading } = useQuery("products", getProductList);

//   // Get unique categories
//   const categoriesSet = new Set();
//   data?.products.forEach((product) => {
//     categoriesSet.add(product.category);
//   });

//   const uniqueCategories = Array.from(categoriesSet);

//   return (
//     <Container maxW="6xl">
//       <Box my="80px">
//         <Heading
//           fontSize={{ base: "large", lg: "x-large" }}
//           mb="30px"
//           position="relative"
//           display="inline-block"
//         >
//           تسوق حسب الفئات
//           <Box
//             position="absolute"
//             bottom="-5px"
//             left="50%"
//             transform="translateX(-50%)"
//             width="100%"
//             height="3px"
//             backgroundColor="purple.600"
//           />
//         </Heading>
//         <Flex
//           justifyContent="center"
//           gap="5px"
//           overflowX="auto"
//           overflowY="hidden"
//           sx={{
//             "&::-webkit-scrollbar": {
//               height: "8px",
//               backgroundColor: "transparent",
//             },
//             "&::-webkit-scrollbar-thumb": {
//               backgroundColor: "purple.600",
//               borderRadius: "8px",
//               width: "10px",
//             },
//             "&::-webkit-scrollbar-track": {
//               backgroundColor: "transparent",
//             },
//             minWidth: "100%", // Ensure that the Flex container is at least 100% wide
//           }}
//         >
//           {isLoading // Show loading skeleton while data is being fetched
//             ? Array.from({ length: 4 }).map((_, index) => (
//                 <Box textAlign="center" key={index}>
//                   <Skeleton
//                     height={{ base: "75px", lg: "125px" }}
//                     width={{ base: "75px", lg: "125px" }}
//                   />
//                 </Box>
//               ))
//             : uniqueCategories.map((category) => (
//                 <Box textAlign={"center"} key={category}>
//                   <motion.div whileHover={{ scale: 1.05 }}>
//                     <Button
//                       as={Link}
//                       to={`/products/categories/${category}`}
//                       height={{ base: "75px", lg: "125px" }}
//                       minW={{ base: "75px", lg: "125px" }}
//                       backgroundColor="purple.600"
//                       color="white"
//                       _hover={{ backgroundColor: "purple.800" }}
//                       boxShadow="md"
//                       p="10px"
//                       mb="10px"
//                       whiteSpace="normal"
//                       aria-label={category}
//                     >
//                       {category.toUpperCase()}
//                     </Button>
//                   </motion.div>
//                 </Box>
//               ))}
//         </Flex>
//       </Box>
//     </Container>
//   );
// };

// export default Categories;
import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { getProductList } from "../services/apiProduct";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Categories = () => {
  const { data, isLoading } = useQuery("products", getProductList);

  // Get unique categories
  const categoriesSet = new Set();
  data?.products.forEach((product) => {
    categoriesSet.add(product.category);
  });

  const uniqueCategories = Array.from(categoriesSet);

  return (
    <Container maxW="6xl">
      <Box mb="50px">
        <Heading
          fontSize={{ base: "large", lg: "x-large" }}
          mb="30px"
          position="relative"
          display="inline-block"
        >
          تسوق حسب الفئات
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
        <Grid
          templateColumns={{
            base: "repeat(3, 1fr)",
            sm: "repeat(4, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap="12px"
        >
          {isLoading // Show loading skeleton while data is being fetched
            ? Array.from({ length: 16 }).map((_, index) => (
                <Box textAlign="center" key={index} rounded="lg">
                  <Skeleton p="10px" w="100%" />
                </Box>
              ))
            : uniqueCategories.map((category) => (
                <Box key={category}>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Button
                      as={Link}
                      to={`/products/categories/${category}`}
                      backgroundColor="purple.600"
                      color="white"
                      _hover={{ backgroundColor: "purple.800" }}
                      boxShadow="md"
                      p="10px"
                      w="100%"
                      whiteSpace="normal"
                      aria-label={category}
                    >
                      {category.toUpperCase()}
                    </Button>
                  </motion.div>
                </Box>
              ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Categories;
