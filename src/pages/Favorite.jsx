import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import FavoriteItem from "../components/FavoriteItem";
import { clearFavorite } from "../app/features/favoriteSlice";

function FavoritePage() {
  const favorite = useSelector((state) => state.favorite);

  const dispatch = useDispatch();

  return (
    <Box p="4">
      {favorite.favorite.length > 0 ? (
        <>
          <Heading
            fontSize={{ base: "large", lg: "xx-large" }}
            mb="20px"
            position="relative"
            display="inline-block"
          >
            المفضلة
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
          {favorite.favorite.map((item) => (
            <FavoriteItem item={item} key={item.id} />
          ))}

          <Button
            backgroundColor={"red.600"}
            color="white"
            _hover={{ backgroundColor: "red.800" }}
            onClick={() => dispatch(clearFavorite())}
          >
            مسح المفضلة
          </Button>
        </>
      ) : (
        <Text fontWeight={"bold"} fontSize={"xx-large"} textAlign={"center"}>
          مفضلتك فارغة
        </Text>
      )}
    </Box>
  );
}

export default FavoritePage;
