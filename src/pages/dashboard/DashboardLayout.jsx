"use client";

import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";
import { BiSolidGrid } from "react-icons/bi";
import { FiHome, FiMenu } from "react-icons/fi";
import { HiOutlineViewColumns, HiShoppingCart } from "react-icons/hi2";
import { MdOutlineRateReview } from "react-icons/md";
import { IoIosStats } from "react-icons/io";
import { FaUser } from "react-icons/fa";

import { Link, Outlet, Link as RouterLink } from "react-router-dom";

const LinkItems = [
  { name: "الرئيسية", to: "/", icon: FiHome },
  { name: "الاحصائيات", to: "/dashboard", icon: IoIosStats },
  { name: "المنتجات", to: "/dashboard/products", icon: HiOutlineViewColumns },
  { name: "الفئات", to: "/dashboard/categories", icon: BiSolidGrid },
  { name: "المستخدمين", to: "/dashboard/users", icon: FaUser },
  { name: "المراجعات", to: "/dashboard/reviews", icon: MdOutlineRateReview },
];

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg="purple.600"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      _rtl="auto"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          <Box as={Link} to="/">
            <HiShoppingCart fontSize={"xxx-large"} color={"white"} />
          </Box>
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} name={link.name} icon={link.icon} to={link.to}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ to, icon, name, ...rest }) => {
  return (
    <Box
      as={RouterLink}
      to={to}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        color="white"
        _hover={{ backgroundColor: "purple.800", color: "white" }}
        gap="10px"
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {name}
      </Flex>
    </Box>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      mr={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
      bg="transparent"
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <Box as={Link} to="/">
          <HiShoppingCart fontSize={"xxx-large"} color="white" />
        </Box>
      </Text>
    </Flex>
  );
};

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        size="sm"
        placement="right"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box mr={{ base: 0, md: 60 }} p="4">
        <Outlet />
      </Box>
    </Box>
  );
};

export default SidebarWithHeader;
