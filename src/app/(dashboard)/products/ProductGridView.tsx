'use client'
import { useCallback, useState } from "react";
import { FiltersProps, ProductFilters } from "./ProductFilters";
import * as productService from "@/app/services/productService";
import { Box, Typography, Pagination } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { CartIcon } from "./CartIcon";
import { ProductItem } from "./ProductItem";
import { ProductSort } from "./ProductSort";


export interface  ProductGridVieProps  {
    defaultFilters:TODO;
    filterOptions:TODO;
}

export default function ProductGridView({
    defaultFilters,
    filterOptions,
}: ProductGridVieProps
 ) {

    const [sortBy, setSortBy] = useState('featured');
    const [openFilter, setOpenFilter] = useState(false);
    const [filters, setFilters] = useState<FiltersProps>(defaultFilters);
    const [page, setPage] = useState(1);
    const _products = productService.getItemsByPageNumber(page); //productService.getAllProducts();
    // products =    productService.getProductsByPageNumber(page);
    const [count, setCount] = useState(_products.length);
    const [products, setProducts] = useState(_products);


    const handlePageChange = useCallback((
        event: React.ChangeEvent<unknown>, page: number
    ) => {
        const products = productService.getItemsByPageNumber(page);
        setProducts(products)
        setPage(page)
    }, [])


    const handleOpenFilter = useCallback(() => {
        setOpenFilter(true);
    }, []);

    const handleCloseFilter = useCallback(() => {
        console.log(filters)
        setOpenFilter(false);
    }, []);

    const handleSort = useCallback((newSort: string) => {
        setSortBy(newSort);
    }, []);

    const handleSetFilters = useCallback((updateState: Partial<FiltersProps>) => {
        setFilters((prevValue) => ({ ...prevValue, ...updateState }));
    }, []);

    const canReset = Object.keys(filters).some(
        (key) =>
            filters[key as keyof FiltersProps] !==
            defaultFilters[key as keyof FiltersProps]
    );

    return (
        <>
            <Box display="flex" alignItems="center" mb={5}>
                <Typography variant="h4" flexGrow={1} sx={{ mb: 5 }}>
                    Products
                </Typography>

                <Box gap={1} display="flex" flexShrink={0} sx={{ my: 1 }}>
                    <ProductFilters
                        canReset={canReset}
                        filters={filters}
                        onSetFilters={handleSetFilters}
                        openFilter={openFilter}
                        onOpenFilter={handleOpenFilter}
                        onCloseFilter={handleCloseFilter}
                        onResetFilter={() => setFilters(defaultFilters)}
                        options={filterOptions}
                    />

                    <ProductSort
                        sortBy={sortBy}
                        onSort={handleSort}
                        options={[
                            { value: 'featured', label: 'Featured' },
                            { value: 'newest', label: 'Newest' },
                            { value: 'priceDesc', label: 'Price: High-Low' },
                            { value: 'priceAsc', label: 'Price: Low-High' },
                        ]}
                    />
                </Box>
            </Box>

            <CartIcon totalItems={8} />

            <Grid container spacing={3}>
                {products.map((product: TODO) => (
                    // <Grid key={product.id} xs={12} sm={6} md={3}>
                    <Grid key={product.id} size={{ xs: 12, sm: 6, md: 3 }}>
                        <ProductItem product={product} />
                    </Grid>
                ))}
            </Grid>

            <Pagination count={count} color="primary"
                sx={{ mt: 8, mx: 'auto' }} page={page} onChange={handlePageChange}
            />
        </>
    );

}


