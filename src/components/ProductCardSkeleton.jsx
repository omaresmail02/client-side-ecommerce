import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";

const ProductCardSkeleton = () => {
  return (
    <Box>
      <Skeleton mt="4" h={200} rounded={"md"} spacing="4" />
      <SkeletonText mt="4" w={20} noOfLines={1} spacing="4" mx={"auto"} />
      <SkeletonText mt="4" noOfLines={1} spacing="4" />
      <SkeletonText mt="4" noOfLines={1} spacing="4" />
      <SkeletonText mt="4" noOfLines={1} spacing="4" />
      <Skeleton mt="4" h={50} rounded={"md"} spacing="4" />
    </Box>
  );
};

export default ProductCardSkeleton;
