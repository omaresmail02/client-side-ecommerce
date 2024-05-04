"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { FiEye, FiEyeOff } from "react-icons/fi";
import { selectSignup, userSignup } from "../app/features/signupSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { error: signupError, loading } = useSelector(selectSignup);

  function onSubmit(data) {
    const {
      "first name": firstname,
      "last name": lastname,
      email,
      password,
      role,
    } = data;

    const username = `${firstname} ${lastname}`;

    dispatch(userSignup({ email, password, username, role }));

    setTimeout(() => {
      if (!signupError) {
        navigate("/login");
      }
    }, 3000);
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            اشترك
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4} as="form" onSubmit={handleSubmit(onSubmit)}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>الاسم</FormLabel>
                  <Input
                    type="text"
                    {...register("first name", {
                      required: "This field is required",
                    })}
                  />
                  {errors.firstname && (
                    <Text color="red">{errors.firstname.message}</Text>
                  )}
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>اللقب</FormLabel>
                  <Input
                    type="text"
                    {...register("last name", {
                      required: "This field is required",
                    })}
                  />
                  {errors.lastname && (
                    <Text color="red">{errors.lastname.message}</Text>
                  )}
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>البريد الالكتروني</FormLabel>
              <Input
                type="email"
                {...register("email", {
                  required: "This field is required",
                })}
              />
              {errors.email && <Text color="red">{errors.email.message}</Text>}
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>كلمة السر</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "This field is required",
                  })}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <FiEye /> : <FiEyeOff />}
                  </Button>
                </InputRightElement>
                {errors.password && (
                  <Text color="red">{errors.password.message}</Text>
                )}
              </InputGroup>
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                backgroundColor="purple.600"
                color="white"
                p="5"
                _hover={{ backgroundColor: "purple.800" }}
                type="submit"
                isLoading={loading}
              >
                اشترك
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?
                <Link as={RouterLink} to={"/login"} color={"blue.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
