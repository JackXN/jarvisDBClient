import React, {useState, useEffect} from 'react'

import {Box, Text} from '@chakra-ui/react';
// import Image from '@chakra-ui/image'
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";



function Product({item}) {
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const getProduct = async () => {
          try {
            const res = await publicRequest.get("http://localhost:5000/api/products/find/" + id);
            setProduct(res.data);
            // console.log(res.data)
        } catch {}
        };
        getProduct();
      }, [id]);
    
      const handleQuantity = (type) => {
        if (type === "dec") {
          quantity > 1 && setQuantity(quantity - 1);
        } else {
          setQuantity(quantity + 1);
        }
      };
      const handleClick = () => {
        dispatch(
          addProduct({ ...product, quantity, color, size })
        );
      };
 
    return (
       <Box sx={styles.container}>
           <Box sx={styles.cardInfo}>
           <img src={item.img}/>
           <Box sx={styles.desc}>
            <Text as='p' fontSize='35px' fontWeight='bold' textTransform='uppercase'>{item.title}</Text>
            <Text as='p'  pt='0px' >{item.description}</Text>
           <Text as='p'>Category: {item.category}</Text>
           <p>Price: {item.price}$</p>
           <p>Collection Name: {item.collectionName}</p>
           <p>In Stock: {item.inStock}</p>
           <p>Color: {item.color}</p>
           </Box>
           </Box>
     </Box>
    )
}

const styles = {
    container: {
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin:'20px',
        color: 'black',
        width: '450px',
       
        
    },

    desc: {
textAlign: 'center',
background: 'white',
margin: '0px'

    },
    cardInfo: {
     background: '#2F2E2E',
     borderRadius: '20px'
    }
}

export default Product
