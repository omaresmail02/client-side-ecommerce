import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { HiEye } from "react-icons/hi2";
import { BiTrash } from "react-icons/bi";
import { getReviewsList, deleteReview } from "../../services/apiReviews";
import { Link } from "react-router-dom";
import CustomeAlertDialog from "../../shared/AlretDialog";

const DashboardReviewsTable = () => {
  const [clickedReviewId, setClickedReviewId] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();
  const { data: reviewsData } = useQuery("reviews", getReviewsList);

  const { isLoading: isDeleting, mutate: mutateDelete } = useMutation({
    mutationFn: () => deleteReview(clickedReviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
    },
  });
  return (
    <>
      <TableContainer>
        <Table variant="simple" my={5}>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>المستخدم</Th>
              <Th>المنتج</Th>
              <Th>المراجعة</Th>
              <Th isNumeric>التقييم</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reviewsData?.map((review) => {
              return (
                <Tr key={review.id}>
                  <Td>{review.id}</Td>
                  <Td>{review?.username}</Td>
                  <Td>
                    {review?.product}
                  </Td>
                  <Td>{review?.comment}</Td>
                  <Td isNumeric>{review?.attributes?.rating}</Td>
                  <Td>
                    <Button
                      as={Link}
                      to={`products/${review?.product}`}
                      colorScheme="purple"
                      variant="solid"
                      mr={3}
                    >
                      <HiEye size={17} />
                    </Button>
                    <Button
                      backgroundColor="red.600"
                      color="white"
                      _hover={{ backgroundColor: "red.800" }}
                      mr={3}
                      onClick={() => {
                        setClickedReviewId(review.id);
                        onOpen();
                      }}
                    >
                      <BiTrash size={17} />
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <CustomeAlertDialog
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        mutate={mutateDelete}
        loading={isDeleting}
      />
    </>
  );
};

export default DashboardReviewsTable;
