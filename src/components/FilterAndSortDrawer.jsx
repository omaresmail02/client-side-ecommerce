import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  RadioGroup,
  Stack,
  Radio,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";

const FilterAndSortDrawer = ({
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  priceFilters,
  setPriceFilters,
  categoryFilters,
  setCategoryFilters,
  data,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        color="white"
        backgroundColor="purple.600"
        _hover={{ backgroundColor: "purple.800" }}
        onClick={onOpen}
      >
        فرز و ترتيب
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>فرز و ترتيب</DrawerHeader>
          <DrawerBody>
            <Accordion defaultIndex={[0]} allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      ترتيب
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <RadioGroup value={sortBy} onChange={setSortBy}>
                    <Stack direction="row">
                      <Radio value="name">ابدجديا</Radio>
                      <Radio value="price">السعر</Radio>
                    </Stack>
                  </RadioGroup>
                  <RadioGroup value={sortOrder} onChange={setSortOrder}>
                    <Stack direction="row">
                      <Radio value="asc">تصاعدي</Radio>
                      <Radio value="desc">تنازلي</Radio>
                    </Stack>
                  </RadioGroup>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Accordion defaultIndex={[0]} allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      السعر
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <CheckboxGroup
                    value={priceFilters}
                    onChange={(values) => setPriceFilters(values)}
                  >
                    <Stack>
                      <Checkbox value="0-99">$0-$99</Checkbox>
                      <Checkbox value="100-199">$100-$199</Checkbox>
                      <Checkbox value="200-299">$200-$299</Checkbox>
                      <Checkbox value="300-399">$300-$399</Checkbox>
                      <Checkbox value="400+">$400+</Checkbox>
                    </Stack>
                  </CheckboxGroup>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Accordion defaultIndex={[0]} allowMultiple>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      الفئات
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <CheckboxGroup
                    value={categoryFilters}
                    onChange={(values) => {
                      setCategoryFilters(values);
                    }}
                  >
                    <Stack>
                      {data?.data
                        ?.reduce((acc, product) => {
                          const categoryTitles =
                            product.attributes.category.data.map((item) =>
                              item.attributes.title.trim()
                            );

                          categoryTitles.forEach((title) => {
                            if (title && !acc.includes(title)) {
                              acc.push(title);
                            }
                          });

                          return acc;
                        }, [])
                        .map((title) => (
                          <Checkbox key={title} value={title}>
                            {title}
                          </Checkbox>
                        ))}
                    </Stack>
                  </CheckboxGroup>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FilterAndSortDrawer;
