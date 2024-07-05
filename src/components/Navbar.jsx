import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { HiChevronDown } from "react-icons/hi2";
import { useQuery } from "react-query";
import { NavLink, useLocation } from "react-router-dom";
import { getCategoriesList } from "../services/apiCategories";

const Navbar = () => {
  const { data, isLoading } = useQuery("categories", getCategoriesList);

  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path;
  };
  return (
    <Box bg="purple.600" px="5px">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <HStack as="nav" spacing={2}>
            <Link
              as={NavLink}
              to="/"
              bg={isActive("/") ? "purple.800" : "transparent"}
              rounded="lg"
              fontWeight="bold"
              p="8px"
              _hover={{ bg: "purple.800" }}
            >
              الرئيسية
            </Link>
            <Link
              as={NavLink}
              to="/products/offers/discounts"
              bg={
                isActive("/products/offers/discounts")
                  ? "purple.800"
                  : "transparent"
              }
              rounded="lg"
              fontWeight="bold"
              p="8px"
              _hover={{ bg: "purple.800" }}
            >
              الخصومات
            </Link>
            <Link
              as={NavLink}
              to="/products"
              color="white"
              bg={isActive("/products") ? "purple.800" : "transparent"}
              rounded="lg"
              fontWeight="bold"
              p="8px"
              _hover={{ bg: "purple.800" }}
            >
              المنتجات
            </Link>

            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<HiChevronDown size="22px" />}
                bg="transparent"
                color="white"
                fontWeight="bold"
                p="8px"
                _hover={{
                  bg: "purple.800",
                }}
              >
                الفئات
              </MenuButton>
              <MenuList>
                {isLoading ? (
                  <MenuItem>Loading...</MenuItem>
                ) : (
                  data.data.categories.map((category) => (
                    <MenuItem key={category.id}>
                      <Link
                        as={NavLink}
                        to={`/products/categories/${category.title}`}
                        color="white"
                        fontWeight="bold"
                      >
                        {category.title}
                      </Link>
                    </MenuItem>
                  ))
                )}
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
