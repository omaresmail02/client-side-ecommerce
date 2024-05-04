import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import { Box, Flex } from "@chakra-ui/react";

const AppLayout = () => {
  return (
    <Flex flexDirection="column" minH="100vh">
      <Navbar />
      <Box flex="1" mt={"64px"}>
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
};

export default AppLayout;
