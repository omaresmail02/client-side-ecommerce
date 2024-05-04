import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

const CustomeModal = ({
  isModalOpen,
  onModalClose,
  title,
  children,
  okTxt = "Done",
  cancelTxt = "Cancel",
  onSubmit,
  mutate,
  loading,
  errorsExist,
}) => {
  return (
    <Modal
      isCentered
      onClose={onModalClose}
      isOpen={isModalOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onModalClose}>
            {cancelTxt}
          </Button>
          <Button
            backgroundColor="purple.600"
            color="white"
            p="5"
            _hover={{ backgroundColor: "purple.800" }}
            onClick={() => {
              onSubmit();
              mutate();
              if (!errorsExist) {
                onModalClose();
              }
            }}
            isLoading={loading}
            disabled={errorsExist}
          >
            {okTxt}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CustomeModal;
