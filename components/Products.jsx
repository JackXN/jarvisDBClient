import {Link} from 'react-router-dom';
import Image from '@chakra-ui/image';

import Product from './Product'
import axios from 'axios';
import { useEffect, useState } from 'react';
import {Box, Text} from '@chakra-ui/react'

const BASE_URL = 'http://localhost:5000'

const Products = ({ cat, filters,sort }) => {
    const [products,setProducts] = useState([]);
    const [filteredProducts,setFilteredProducts] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
          try {
            const res = await axios.get(
              cat
                ? `${BASE_URL}/api/products?category=${cat}`
                : `${BASE_URL}/api/products`
            );
            setProducts(res.data);
            // console.log(res.data)
          } catch (err) {}
        };
        getProducts();
      }, [cat]);
    
      useEffect(() => {
        cat &&
          setFilteredProducts(
            products.filter((item) =>
              Object.entries(filters).every(([key, value]) =>
                item[key].includes(value)
              )
            )
          );
      }, [products, cat, filters]);
    
      useEffect(() => {
        if (sort === "newest") {
          setFilteredProducts((prev) =>
            [...prev].sort((a, b) => a.createdAt - b.createdAt)
          );
        } else if (sort === "asc") {
          setFilteredProducts((prev) =>
            [...prev].sort((a, b) => a.price - b.price)
          );
        } else {
          setFilteredProducts((prev) =>
            [...prev].sort((a, b) => b.price - a.price)
          );
        }
      }, [sort]);
    return (
       <>
       <Text as='h1' textAlign='center' fontSize='50px' mb='50px' textDecoration='underline'>Products</Text>
       <Box sx={styles.container}>


{cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id}/>)}
</Box>
</>
    
    )
}


const styles = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems:'center',
        justifyContent: 'center'
    }
}

export default Products;