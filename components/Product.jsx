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
            const res = await publicRequest.get("http://localhost:5000/api/collections/find/" + id);
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
          <Text as='p' fontSize='35px' fontFamily='Bangers,san-serif' background='red' color='black'fontWeight='bold' textTransform='uppercase'>{item.title}</Text>
          <Box sx={styles.infoStuff}>
          <Text as='p'  fontFamily='Bangers,san-serif'  color='white' fontSize='20px' pt='-20px' mr='20px' ml='20px'fontWeight='light' >{item.description}</Text>
           <Text as='p'><span style={{background: 'blue', color:'white', padding: '10px'}}>Category:</span> <span style={{background: 'white', padding: '10px', color: 'black'}}>{item.category}</span></Text>
           <p><span style={{background: 'red', padding: '10px' }}>Price:</span><span style={{background: 'white', padding:'10px'}}> {item.price}$</span></p>
           <p><span style={{background: 'lightgreen', padding: '10px'}}>Collection Name:</span> <span style={{background: 'white', padding: '10px'}}>{item.collectionName}</span></p>
           <p><span style={{background: 'orange', padding: '10px'}}>In Stock:</span><span style={{
             background: 'white',
             padding: '10px'
           }}>{item.inStock}</span></p>
           <p><span style={{background:'pink',padding: '10px'}}>Color:</span><span style={{background: 'white', padding: '10px'}}> {item.color}</span></p>
           </Box>
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
        // margin:'20px',
        color: 'black',
        width: '450px',
       
        
    },

    desc: {
textAlign: 'center',
background: '#525353',
borderRadius: '20px',
height: '500',

    },
    cardInfo: {
     background: '#2F2E2E',
     borderRadius: '20px'
    },
    infoStuff: {
      p: {
        padding: '10px'
      }
    }
}

export default Product
