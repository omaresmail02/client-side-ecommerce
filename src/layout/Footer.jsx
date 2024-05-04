"use client";

import { Box, Container, Stack, Text } from "@chakra-ui/react";
import { HiShoppingCart } from "react-icons/hi2";
import { Link } from "react-router-dom";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box bg="purple.600" color="white">
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Box as={Link} to="/">
          <HiShoppingCart fontSize={"xxx-large"} />
        </Box>
        <Text> متجر التجارة الالكتروني © {currentYear}</Text>
      </Container>
    </Box>
  );
}
