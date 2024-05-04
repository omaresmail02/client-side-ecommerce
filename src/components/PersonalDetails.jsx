import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Box,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const FormExample = () => {
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
  }
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} maxW="md" mx="auto" mt="8">
      <VStack spacing="4">
        <FormControl id="firstName">
          <FormLabel>الاسم</FormLabel>
          <Input
            type="text"
            name="firstName"
            {...register("firstname", {
              required: "This field is required",
            })}
          />
        </FormControl>
        <FormControl id="lastName">
          <FormLabel>اللقب</FormLabel>
          <Input
            type="text"
            name="lastName"
            {...register("lastname", {
              required: "This field is required",
            })}
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>البريد الالكتروني</FormLabel>
          <Input
            type="email"
            name="email"
            {...register("email", {
              required: "This field is required",
            })}
          />
        </FormControl>
        <FormControl id="phoneNumber">
          <FormLabel>رقم الهاتف</FormLabel>
          <Input type="tel" name="phoneNumber" {...register("phoneNumber")} />
        </FormControl>
        <FormControl id="address">
          <FormLabel>العنوان</FormLabel>
          <Input type="text" name="address" {...register("address")} />
        </FormControl>
        <Button type="submit" colorScheme="teal">
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default FormExample;
