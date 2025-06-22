'use client'
import Products from '@/component/products/myproducts';
import {  Card,  Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

async function  listByShop(params,signal){
  try{
     let response = await fetch(`http://localhost:3000/api/product/${params.shopId}`, {      
         method:'GET',
         headers:{
             'Credentials':'include',
             'Accept':'application/json'
         },
         signal:signal
     })
     if(!response.ok){
         throw new Error(` error! Status:${response.status}`)
     }
     return await response.json()
  }catch(err){
    console.error("Error fetching products:",err.message);
    return null;
  }
 }
export default function ShopComponent() {
  const [shop, setShop] = useState(null);
  const { shopId } = useParams()
  const [products,setProducts]=useState(null)
const theme=useTheme()

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchShop = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/shop/shops/${shopId}`, {
          method: 'GET',
          credentials: 'include',
          signal: signal,
        });

        if (response.ok) {
          const data = await response.json();
          setShop(data.data);
        } else {
          throw new Error('Cannot read shop');
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.log('Fetch error:', err.message);
        }
      }
    };

    fetchShop();

    return () => {
      abortController.abort();
    };
  }, [shopId]);

    useEffect(()=>{
        const abortController= new AbortController();
        const signal=abortController.signal;
        listByShop({
            shopId:shopId
        },signal).then((data)=>{
            if(data.error){
                console.log("fetch products by id error",data.error)
            }else{
                console.log('data',data)
                setProducts(data.data)
            }
        })
    
    },[shopId])

 
  return (
    <>   
    {shop ? (
      
      <Fragment>
      <Card style={{
         gridArea: 'shop',
        display: 'grid',
        placeItems: 'center',
        gap: 0,
        boxShadow: `10px 0 10px 0px ${theme.palette.text}`,
        padding:theme.spacing(4)
        }}>
        <Typography variant='h5'>{shop.name}</Typography>
        <Image
          src={shop.image.url}
          alt={shop.image.original_filename}
          width={150}
          height={150}
          style={{ borderRadius: '50%', objectFit: "cover",
            margin:theme.spacing(2)
           }}
          unoptimized />
        <Typography variant='p'>{shop.description}</Typography>
      </Card>
      <Card style={{gridArea:'products',height:'auto'}}>
        <Products products={products}/>
      </Card>
      </Fragment>
          
    ) : (
      <p>Loading shop...</p>
    )}
    </>

  );
}