'use client'
import MyProducts from "@/component/products/myproducts";
import { Add, Upload } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Container, FormControl, FormLabel, IconButton, List, ListItem, Paper, TextField, Typography, useTheme } from "@mui/material";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function EditShop() {
    const [products,setProducts]=useState([]);
    const theme = useTheme()
    const {shopId}= useParams()

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
    return (<>
        <Paper style={{ marginBottom: theme.spacing(3), gridArea: 'editshop', paddingTop: theme.spacing(4) }}>
            <Container style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: theme.spacing(1) }}>
                <Typography variant="h4">Edit Shop</Typography>
                <Avatar />
                <FormControl>
                    <input type="file" id="photo" style={{ display: 'none' }} />
                </FormControl>
                <Button sx={{
                    color: theme.palette.text.contrastText,
                    background: `linear-gradient(${theme.palette.primary.main} 5%,red 95%)`
                }}>
                    ChangePhoto<Upload />
                </Button>
            </Container>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: theme.spacing(3),
                flexDirection: 'column',
                gap: theme.spacing(2)
            }}>
                <FormControl style={{width:'50%'}}>
                    <FormLabel>Name</FormLabel>
                    <TextField
                        id="name"
                        type="text"
                        placeholder="Enter shop name here.."
                        required
                        variant="outlined"
                        color={'primary'}
                    />
                </FormControl>
                <FormControl style={{width:'50%',border:'none'}}>
                    <FormLabel>Description</FormLabel>
                    <TextField
                        id="name"
                        type="text"
                        placeholder="Enter shop name here.."
                        required
                        variant="outlined"
                        color={'primary'}
                        
                    />
                </FormControl>
                <Typography>Owner:</Typography>
                <Button variant="contained"
                    color= 'secondary'
                   >Update</Button>
            </Box>
        </Paper>
        <Paper style={{ gridArea: 'products' }}>
         <Box style={{
            position:'sticky',
            display:'flex',
            justifyContent:'space-between',
            padding:theme.spacing(1),
            alignItems:'center'}}>
            <Typography variant='h4' color="primary">Products</Typography> 
            <Button color="primary"
               variant="contained"
               sx={{
                 color:theme.palette.text.contrastText,
                   background: `linear-gradient(${theme.palette.primary.main} 5%,red 95%)`
               }}
               LinkComponent={Link}
               href={"/products/addNewP/"+shopId}
               >
                <Add/>NEW PRODUCT
            </Button></Box>
         <MyProducts products={products || []} searched={false} />
        </Paper>
    </>
    )
}