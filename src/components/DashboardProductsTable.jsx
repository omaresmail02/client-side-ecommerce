import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  createProduct,
  deleteProduct,
  getProductList,
  updateProduct,
} from "../services/apiProduct";
import TableSkeleton from "./TableSkeleton";
import CustomeAlertDialog from "../shared/AlretDialog";
import CustomeModal from "../shared/Modal";

import { HiEye } from "react-icons/hi2";
import { BiTrash } from "react-icons/bi";
import { FiEdit2 } from "react-icons/fi";
import { getCategoriesList } from "../services/apiCategories";

const DashboardProductsTable = () => {
  const [clickedProductId, setClickedProductId] = useState(null);

  const [productToEdit, setProductToEdit] = useState({});
  const { id: editId = {}, ...editValues } = productToEdit;

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const errorsExist = Object.keys(errors).length > 0;

  useEffect(() => {
    if (editValues?.attributes) {
      setValue("title", editValues.attributes.title || "");
      setValue("description", editValues.attributes.description || "");
      setValue("price", editValues.attributes.price || 0);
      setValue("stock", editValues.attributes.stock || 0);
      setValue(
        "thumbnail",
        editValues.attributes?.thumbnail?.data?.attributes?.url || ""
      );
    }
  }, [editValues.attributes, setValue, editValues]);

  const queryClient = useQueryClient();

  const { data: categoriesData } = useQuery("categories", getCategoriesList);

  const { isLoading, data } = useQuery("products", getProductList);

  const { isLoading: isCreating, mutate: mutateCreate } = useMutation(
    createProduct,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
      },
    }
  );

  const { isLoading: isUpdating, mutate: mutateUpdate } = useMutation(
    updateProduct,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["products"],
        });
      },
    }
  );

  const { isLoading: isDeleting, mutate: mutateDelete } = useMutation({
    mutationFn: () => deleteProduct(clickedProductId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const onCreateSubmit = (data) => {
    const selectedCategory = categoriesData.data.find(
      (category) => category.attributes.title === data.category
    );

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: data.title,
        description: data.description,
        price: data.price,
        stock: data.stock,
        category: selectedCategory.id,
      })
    );
    // Append the file to the form data
    formData.append("files.thumbnail", data.thumbnail[0]);

    mutateCreate({ body: formData });
  };

  const selectedCategory = categoriesData?.data?.find(
    (category) => category.attributes.title === data?.category
  );

  const onEditSubmit = (data) => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: data.title,
        description: data.description,
        price: data.price,
        stock: data.stock,
        category: selectedCategory.id,
      })
    );
    // Append the file to the form data
    if (data.thumbnail.length > 0) {
      formData.append("files.thumbnail", data.thumbnail[0]);
    }
    mutateUpdate({ id: editId, body: formData });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose,
  } = useDisclosure();

  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onClose: onEditModalClose,
  } = useDisclosure();

  if (isLoading) return <TableSkeleton />;
  return (
    <>
      <Button
        backgroundColor="purple.600"
        color="white"
        p="5"
        _hover={{ backgroundColor: "purple.800" }}
        onClick={onCreateModalOpen}
      >
        اضف منتج جديد
      </Button>
      <TableContainer>
        <Table variant="simple" my={5}>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Category</Th>
              <Th>Thumbnail</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Stock</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data?.map((product) => {
              return (
                <Tr key={product.id}>
                  <Td>{product.id}</Td>
                  <Td>{product?.attributes?.title}</Td>
                  <Td>
                    {product?.attributes?.category?.data[0]?.attributes?.title}
                  </Td>
                  <Td>
                    <Image
                      borderRadius="full"
                      objectFit="contain"
                      boxSize="60px"
                      bg="white"
                      src={product.attributes?.thumbnail?.data?.attributes?.url}
                      alt={product?.attributes?.title}
                    />
                  </Td>
                  <Td isNumeric>${product?.attributes?.price}</Td>
                  <Td isNumeric>{product?.attributes?.stock}</Td>
                  <Td>
                    <Button
                      as={Link}
                      to={`/products/${product.id}`}
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
                      mx={3}
                      onClick={() => {
                        setClickedProductId(product.id);
                        onOpen();
                      }}
                    >
                      <BiTrash size={17} />
                    </Button>
                    <Button
                      colorScheme="blue"
                      variant="solid"
                      onClick={() => {
                        setProductToEdit(product);
                        onEditModalOpen();
                      }}
                    >
                      <FiEdit2 size={17} />
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
      <CustomeModal
        isModalOpen={isCreateModalOpen}
        onModalOpen={onCreateModalOpen}
        onModalClose={onCreateModalClose}
        title={"Create Product"}
        okTxt="Create"
        loading={isCreating}
        mutate={mutateCreate}
        onSubmit={handleSubmit(onCreateSubmit)}
        errorsExist={errorsExist}
      >
        <FormControl>
          <FormLabel>Product title</FormLabel>
          <Input {...register("title", { required: `Title is required` })} />
          {errors.title && <Text color="red">{errors.title.message}</Text>}
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Product description</FormLabel>
          <Textarea
            {...register("description", {
              required: "Descreiption is required",
            })}
          />
          {errors.description && (
            <Text color="red">{errors.description.message}</Text>
          )}
        </FormControl>

        <FormControl my={3}>
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Product category
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <RadioGroup>
                  <Stack>
                    {categoriesData?.data?.map((category) => {
                      return (
                        <Radio
                          key={category.id}
                          value={category.attributes.title}
                          {...register("category", {
                            required: "Category is required",
                          })}
                        >
                          {category.attributes.title}
                        </Radio>
                      );
                    })}
                    {errors.category && (
                      <Text color="red">{errors.category.message}</Text>
                    )}
                  </Stack>
                </RadioGroup>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Price</FormLabel>
          <NumberInput>
            <NumberInputField
              {...register("price", { required: "Price is required" })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          {errors.price && <Text color="red">{errors.price.message}</Text>}
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Count in stock</FormLabel>
          <NumberInput
            {...register("stock", { required: "Stock is required" })}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          {errors.stock && <Text color="red">{errors.stock.message}</Text>}
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Thumbnail</FormLabel>
          <Input
            type="file"
            placeholder="Product thumbnail"
            {...register("thumbnail", { required: "Thumbnail is required" })}
          />
          {errors.thumbnail && (
            <Text color="red">{errors.thumbnail.message}</Text>
          )}
        </FormControl>
      </CustomeModal>
      <CustomeModal
        isModalOpen={isEditModalOpen}
        onModalOpen={onEditModalOpen}
        onModalClose={onEditModalClose}
        title={"Update Product"}
        okTxt="Update"
        loading={isUpdating}
        mutate={mutateUpdate}
        onSubmit={handleSubmit(onEditSubmit)}
      >
        <FormControl>
          <FormLabel>Product title</FormLabel>
          <Input
            placeholder="Product title"
            id="title"
            {...register("title")}
          />
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Product description</FormLabel>
          <Textarea placeholder="Description" {...register("description")} />
        </FormControl>

        <FormControl my={3}>
          <Accordion defaultIndex={[0]} allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Product category
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <RadioGroup>
                  <Stack>
                    {categoriesData?.data?.map((category) => {
                      return (
                        <Radio
                          key={category.id}
                          value={category.attributes.title}
                          {...register("category")}
                          defaultChecked={
                            editValues?.attributes?.category?.data[0]
                              ?.attributes.title === category.attributes.title
                          }
                        >
                          {category.attributes.title}
                        </Radio>
                      );
                    })}
                  </Stack>
                </RadioGroup>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Price</FormLabel>
          <NumberInput>
            <NumberInputField {...register("price")} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Count in stock</FormLabel>
          <NumberInput {...register("stock")}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl my={3}>
          <FormLabel>Thumbnail</FormLabel>
          <Input
            type="file"
            placeholder="Product thumbnail"
            {...register("thumbnail")}
          />
        </FormControl>
      </CustomeModal>
    </>
  );
};

export default DashboardProductsTable;
