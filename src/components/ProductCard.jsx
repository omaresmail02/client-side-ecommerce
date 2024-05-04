import {
  Card,
  CardBody,
  Text,
  Button,
  Image,
  Stack,
  Heading,
  CardFooter,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProductCard = ({ id, attributes }) => {
  const maxLength = 40; // Maximum length for the description

  return (
    <Card
      boxShadow="xl"
      height="100%"
      minH="746px"
      rounded="md"
      overflow="hidden"
    >
      <CardBody p={0} height="100%">
        <Image
          src={attributes?.thumbnail?.data?.attributes?.url}
          alt={attributes.title}
          mx="auto"
          objectFit="fill"
          height="350px" // Set a fixed height for all images
          width="100%"
          transition="transform 0.3s"
          _hover={{ transform: "scale(1.1)" }}
        />
        <Stack spacing="3" alignItems="center" p={4} height="50%">
          <Heading
            size="lg"
            fontWeight="bold"
            p={3}
            mb={2}
            rounded="lg"
            textTransform="capitalize"
            wordBreak="break-word"
          >
            {attributes.title}
          </Heading>
          <Text>
            {attributes.description.length > maxLength
              ? `${attributes.description.substring(0, maxLength)}...`
              : attributes.description}
          </Text>
          <Text color="purple.600" fontSize="x-large">
            ${attributes.price}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter justifyContent="center">
        <Button
          as={Link}
          to={`/products/${id}`}
          backgroundColor="purple.600"
          color="white"
          fontSize="md"
          p="5"
          _hover={{ backgroundColor: "purple.800" }}
        >
          اظهر التفاصيل
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
