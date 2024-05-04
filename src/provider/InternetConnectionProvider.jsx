import { useToast } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { BiWifi } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { networkMode } from "../app/features/networkSlice";

const InternetConnectionProvider = ({ children }) => {
  const toast = useToast();
  const toastIdRef = useRef();

  const dispatch = useDispatch();

  function close() {
    toast.closeAll(toastIdRef.current);
  }

  function addToast() {
    toastIdRef.current = toast({
      title: "You are offline!",
      description: "Please check your internet connection",
      status: "warning",
      duration: null,
      isClosable: true,
      position: "top-right",
      icon: <BiWifi size={20} />,
    });
  }

  const setOnLine = () => {
    dispatch(networkMode(true));
    close();
  };
  const setOffLine = () => {
    dispatch(networkMode(false));
    addToast();
  };

  useEffect(() => {
    window.addEventListener("online", setOnLine);

    window.addEventListener("offline", setOffLine);

    return () => {
      window.removeEventListener("online", setOnLine);
      window.removeEventListener("offline", setOffLine);
    };
  }, []);

  return children;
};

export default InternetConnectionProvider;
