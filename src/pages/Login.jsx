"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormHelperText,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectLogin, userLogin } from "../app/features/loginSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ isAuthenticated }) {
  const { register, handleSubmit, formState } = useForm();

  const { errors } = formState;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { loading, error: loginError } = useSelector(selectLogin);

  function onSubmit(data) {
    const { email: identifier, password } = data;
    dispatch(userLogin({ identifier, password }));
    setTimeout(() => {
      if (!loginError) {
        navigate("/");
      }
    }, 3000);
  }

  const backgroundColor = useColorModeValue("gray.50", "gray.800");
  const formColor = useColorModeValue("white", "gray.700");

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={backgroundColor}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>سجل الدخول الى حسابك</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={formColor}
          boxShadow={"lg"}
          p={8}
          as="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>البريد الالكتروني</FormLabel>
              <Input
                type="email"
                {...register("email", {
                  required: "This field is required",
                })}
                isInvalid={errors?.email?.message}
              />
              <FormHelperText color={"red.500"}>
                {errors?.email?.message && errors.email.message}
              </FormHelperText>
            </FormControl>
            <FormControl id="password">
              <FormLabel>كلمة السر</FormLabel>
              <Input
                type="password"
                {...register("password", {
                  required: "This field is required",
                })}
                isInvalid={errors?.password?.message}
              />
              <FormHelperText color={"red.500"}>
                {errors?.password?.message && errors.password.message}
              </FormHelperText>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Text as={Link} to={"/signup"} color={"blue.400"}>
                  مستخدم جديد؟
                </Text>
                <Text as={Link} to={"/reset-password"} color={"blue.400"}>
                  نسيت كلمة المرور؟
                </Text>
              </Stack>
              <Button
                backgroundColor="purple.600"
                color="white"
                size="large"
                p="5"
                _hover={{ backgroundColor: "purple.800" }}
                type="submit"
                isLoading={loading}
              >
                سجل الدخول
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
