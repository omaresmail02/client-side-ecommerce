import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Rating } from "react-simple-star-rating";
import {
  createReview,
  deleteReview,
  getProductReviews,
  updateReview,
} from "../services/apiReviews";
import { getMyUser } from "../services/apiUsers";
import { useForm } from "react-hook-form";
import { BsStarFill } from "react-icons/bs";
import CookieServices from "../services/CookieServices";
import { formatDate } from "../utils";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import CustomeModal from "../shared/Modal";
import CustomeAlertDialog from "../shared/AlretDialog";

const Reviews = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [clickedReviewId, setClickedReviewId] = useState(null);

  const { register, handleSubmit } = useForm();
  const toast = useToast();

  const queryClient = useQueryClient();

  const { data: reviewsData } = useQuery(["reviews", productId], () =>
    getProductReviews(productId)
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const { data: myUserData } = useQuery("myUser", getMyUser);

  const { isLoading: isCreating, mutate: mutateCreate } = useMutation(
    createReview,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["reviews"],
        });
      },
    }
  );
  const { isLoading: isUpdating, mutate: mutateUpdate } = useMutation(
    updateReview,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["reviews"],
        });
        onClose();
        toast({
          title: "تم تعديل المراجعة بنجاح",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      },
    }
  );

  const { isLoading: isDeleting, mutate: mutateDelete } = useMutation({
    mutationFn: () => deleteReview(clickedReviewId),
    onSuccess: () => {
      queryClient.invalidateQueries("reviews"),
        toast({
          title: "تم حذف المراجعة بنجاح",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
    },
  });

  const { data: userData } = useQuery("users", getMyUser);

  const token = CookieServices.get("jwt");

  const handleRating = (newRating) => {
    setRating(newRating); // Update rating state when the user clicks on a star
  };

  const onSubmit = (data) => {
    const body = {
      rating: rating,
      review: data.review,
    };

    mutateCreate({ id: productId, body });
  };

  const onUpdate = (data) => {
    const body = {
      rating: rating,
      review: data.review,
    };

    mutateUpdate({ id: clickedReviewId, body });
  };

  // Check if the user has already made a review for this product
  const hasReviewed = reviewsData?.data?.reviews.some(
    (review) => review?.user?._id === userData?.data.user._id
  );

  return (
    <>
      <Heading
        fontSize={{ base: "large", lg: "xx-large" }}
        mb="20px"
        position="relative"
        display="inline-block"
      >
        المراجعات
        <Box
          position="absolute"
          bottom="-5px"
          left="50%"
          transform="translateX(-50%)"
          width="100%"
          height="3px"
          backgroundColor="purple.600"
        />
      </Heading>
      {token && !hasReviewed && (
        <Box as="form" onSubmit={handleSubmit(onSubmit)} mb="40px">
          <VStack>
            <FormControl>
              <FormLabel>مراجعة المنتج</FormLabel>
              <Textarea
                placeholder="مراجعة المنتج"
                {...register("review", {
                  required: "This field is required",
                })}
                borderColor="purple.600"
                _hover={{ borderColor: "purple.800" }}
              />
            </FormControl>
            <Box>
              <Rating
                onClick={handleRating}
                ratingValue={rating}
                rtl
                transition
                iconsCount={5}
                titleSeparator="من"
                SVGstyle={{ display: "inline-block" }}
              />
            </Box>
            <Button
              type="submit"
              backgroundColor="purple.600"
              color="white"
              size="large"
              p="5"
              _hover={{ backgroundColor: "purple.800" }}
              isLoading={isCreating}
            >
              مراجعة
            </Button>
          </VStack>
        </Box>
      )}
      <Flex flexDirection="column" gap="15px">
        {reviewsData?.data.reviews.map((review) => (
          <Flex
            key={review.id}
            justifyContent="space-between"
            borderWidth="1px"
            borderRadius="md"
            borderColor={"purple.600"}
            boxShadow="xl"
            p="4"
          >
            <Box>
              <Heading as="h4" fontSize="22px" mb="8px">
                {review?.user?.name}
              </Heading>
              <Box my="8px">
                <Text color="gray.300">{formatDate(review.createdAt)}</Text>
                {review.updatedAt > review.createdAt && (
                  <Text color="gray.300">
                    تم تعديله:{formatDate(review.updatedAt)}
                  </Text>
                )}
              </Box>
              <Text display="inline-block" my="8px">
                التقييم:{review?.rating}
                <Text as="span" display="flex" gap="1">
                  {[...Array(review?.rating)].map((_, index) => (
                    <BsStarFill color="gold" key={index} />
                  ))}
                </Text>
              </Text>
              <Text fontSize="18px">{review?.review}</Text>
            </Box>
            {myUserData?.data.user?._id === review.user?._id && (
              <Flex gap="15px">
                <Box
                  cursor="pointer"
                  onClick={() => {
                    setClickedReviewId(review.id);
                    onOpen();
                  }}
                >
                  <FiEdit2 size="18px" />
                </Box>
                <Box
                  cursor="pointer"
                  onClick={() => {
                    setClickedReviewId(review.id);
                    onDeleteOpen();
                  }}
                >
                  <FiTrash2 size="18px" />
                </Box>
              </Flex>
            )}
          </Flex>
        ))}
      </Flex>
      <CustomeModal
        isModalOpen={isOpen}
        onModalOpen={onOpen}
        onModalClose={onClose}
        title="تعديل المراجعة"
        okTxt="تعديل"
        cancelTxt="الغاء"
        loading={isUpdating}
        mutate={mutateUpdate}
        onSubmit={handleSubmit(onUpdate)}
      >
        <FormControl mb="20px">
          <FormLabel>مراجعة المنتج</FormLabel>
          <Textarea
            placeholder="مراجعة المنتج"
            {...register("review", {
              required: "This field is required",
            })}
            borderColor="purple.600"
            _hover={{ borderColor: "purple.800" }}
          />
        </FormControl>
        <Box>
          <Rating
            onClick={handleRating}
            ratingValue={rating}
            rtl
            transition
            iconsCount={5}
            titleSeparator="من"
            SVGstyle={{ display: "inline-block" }}
          />
        </Box>
      </CustomeModal>
      <CustomeAlertDialog
        isOpen={isDeleteOpen}
        onOpen={onDeleteOpen}
        onClose={onDeleteClose}
        mutate={mutateDelete}
        loading={isDeleting}
      />
    </>
  );
};

export default Reviews;
