import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  useColorMode,
  Center,
  Text,
} from "@chakra-ui/react";
import {
  HiOutlineHeart,
  HiOutlineMoon,
  HiOutlineShoppingBag,
  HiOutlineSun,
  HiShoppingCart,
} from "react-icons/hi";
import { Link as RouterLink } from "react-router-dom";
import CookieServices from "../services/CookieServices";
import { useSelector } from "react-redux";
import SearchBar from "../components/Search";
import { useQuery } from "react-query";
import { getMyUser } from "../services/apiUsers";

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();

  const cart = useSelector((state) => state.cart);
  const favorite = useSelector((state) => state.favorite);

  const token = CookieServices.get("jwt");

  const logoutHandler = () => {
    CookieServices.remove("jwt");
    document.location.reload();
  };

  const { data } = useQuery("users", getMyUser);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible]);

  return (
    <Box
      bg={"purple.600"}
      px={4}
      boxShadow={"lg"}
      position={"fixed"}
      width={"100%"}
      zIndex={10}
      transition={"top 0.3s"}
      top={visible ? "0" : "-70px"}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box as={RouterLink} to="/">
          <HiShoppingCart fontSize={"xxx-large"} color={"white"} />
        </Box>

        <Box
          display={{ base: "none", md: "block" }}
          border="1px solid white"
          rounded="md"
        >
          <SearchBar />
        </Box>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={1}>
            <Button
              onClick={toggleColorMode}
              bg={"none"}
              _hover={{ bg: "none" }}
              p="0"
            >
              {colorMode === "light" ? (
                <Text
                  as={"span"}
                  fontSize={{ base: "large", md: "x-large" }}
                  transition="0.25s"
                  _hover={{
                    fontSize: "xx-large",
                  }}
                >
                  <HiOutlineMoon color={"white"} />
                </Text>
              ) : (
                <Text
                  as={"span"}
                  fontSize={{ base: "large", md: "x-large" }}
                  transition="0.25s"
                  _hover={{
                    fontSize: "xx-large",
                  }}
                >
                  <HiOutlineSun color={"white"} />
                </Text>
              )}
            </Button>
            <Box position="relative">
              <Button
                as={RouterLink}
                to={"/cart"}
                bg={"none"}
                _hover={{ bg: "none" }}
                p="0"
              >
                <Text
                  as={"span"}
                  fontSize={"x-large"}
                  transition="0.25s"
                  _hover={{
                    fontSize: "xx-large",
                  }}
                >
                  <HiOutlineShoppingBag color={"white"} />
                </Text>
                {cart.cart.length > 0 && (
                  <Box
                    position="absolute"
                    top="0"
                    right="0"
                    transform="translate(-50%, -50%)"
                    width="20px"
                    height="20px"
                    rounded="md"
                    backgroundColor="red"
                    color="white"
                    textAlign="center"
                  >
                    {cart.cart.length}
                  </Box>
                )}
              </Button>
            </Box>
            <Box>
              <Button
                as={RouterLink}
                to={"/favorite"}
                bg={"none"}
                _hover={{ bg: "none" }}
                p="0"
              >
                <Text
                  as={"span"}
                  fontSize={{ base: "large", md: "x-large" }}
                  transition="0.25s"
                  _hover={{
                    fontSize: "xx-large",
                  }}
                >
                  <HiOutlineHeart color={"white"} />
                </Text>
                {favorite.favorite.length > 0 && (
                  <Box
                    position="absolute"
                    top="0"
                    right="0"
                    transform="translate(-50%, -50%)"
                    width="20px"
                    height="20px"
                    // borderRadius="50%"
                    rounded="md"
                    backgroundColor="red"
                    color="white"
                    textAlign="center"
                  >
                    {favorite.favorite.length}
                  </Box>
                )}
              </Button>
            </Box>

            {token ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"sm"} />
                </MenuButton>
                <MenuList
                  alignItems={"center"}
                  fontSize={{ base: "sm", md: "md" }}
                >
                  <br />
                  <Center>
                    <Avatar size={{ base: "md", md: "xl" }} alt="avatar" />
                  </Center>
                  <br />
                  <Center>
                    <Text>{data?.username}</Text>
                  </Center>
                  <br />
                  <MenuDivider />
                  {data?.role?.type === "admin" && (
                    <MenuItem as={RouterLink} to="/dashboard">
                      لوحة التحكم
                    </MenuItem>
                  )}
                  <MenuItem as={RouterLink} to="/userProfile">
                    حساب المستخدم
                  </MenuItem>
                  <MenuItem onClick={logoutHandler}>تسجيل الخروج</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Flex gap={3}>
                <Button
                  bg="white"
                  color="purple.800"
                  border="2px solid"
                  borderColor="purple.800"
                  _hover={{
                    bg: "purple.800",
                    color: "white",
                    border: "2px solid",
                    borderColor: "white",
                  }}
                  as={RouterLink}
                  to={"/signup"}
                >
                  اشترك
                </Button>
                <Button
                  bg="white"
                  color="purple.800"
                  border="2px solid"
                  borderColor="purple.800"
                  _hover={{
                    bg: "purple.800",
                    color: "white",
                    border: "2px solid",
                    borderColor: "white",
                  }}
                  as={RouterLink}
                  to={"/login"}
                >
                  تسجيل الدخول
                </Button>
              </Flex>
            )}
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
