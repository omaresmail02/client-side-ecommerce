import { useState } from "react";
import { Box, Grid, Text } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import FilterAndSortDrawer from "../components/FilterAndSortDrawer";
import { useQuery } from "react-query";
import { getProductList } from "../services/apiProduct";
import Pagination from "../components/Pagination";

const Products = () => {
  const { isLoading, data } = useQuery("products", getProductList);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [priceFilters, setPriceFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) {
    return (
      <Grid
        m={"30"}
        templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
        gap={"6"}
      >
        {Array.from({ length: 20 }, (_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </Grid>
    );
  }

  let filteredProducts = data.data;

  // Filter by price
  if (priceFilters.length > 0) {
    filteredProducts = filteredProducts.filter((product) => {
      const price = product.attributes.price;
      return priceFilters.some((range) => {
        const [min, max] = range.split("-");
        if (max) {
          return price >= parseInt(min) && price <= parseInt(max);
        } else {
          return price >= parseInt(min);
        }
      });
    });
  }

  // Filter by category
  if (categoryFilters.length > 0) {
    const uniqueCategoryFilters = new Set(categoryFilters);
    filteredProducts = filteredProducts.filter((product) =>
      product.attributes.category.data.some((category) =>
        uniqueCategoryFilters.has(category.attributes.title)
      )
    );
  }

  // Sort products
  filteredProducts.sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.attributes.title.localeCompare(b.attributes.title)
        : b.attributes.title.localeCompare(a.attributes.title);
    } else if (sortBy === "price") {
      return sortOrder === "asc"
        ? a.attributes.price - b.attributes.price
        : b.attributes.price - a.attributes.price;
    }
    return 0;
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <>
      <Box mr="10px" mt="10px">
        <FilterAndSortDrawer
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          priceFilters={priceFilters}
          setPriceFilters={setPriceFilters}
          categoryFilters={categoryFilters}
          setCategoryFilters={setCategoryFilters}
          data={data}
        />
      </Box>
      {filteredProducts.length === 0 ? (
        <Text textAlign={"center"} fontWeight={"bolder"} fontSize={"xx-large"}>
          لا يوجد منتجات تطابق الفرز
        </Text>
      ) : (
        <>
          <Grid
            m={"30"}
            templateColumns={"repeat(auto-fill, minmax(300px, 1fr))"}
            gap={"6"}
          >
            {filteredProducts.slice(startIndex, endIndex).map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </Grid>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </>
  );
};

export default Products;
