'use client'
import Products from "@/component/products/products";
import { Add, Upload } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Container, FormControl, FormLabel, IconButton, List, ListItem, Paper, TextField, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

async function listByShop(params, signal) {
    try {
        let response = await fetch(`http://localhost:3000/api/product/${params.shopId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            },
            signal: signal
        })
        if (!response.ok) {
            throw new Error(` error! Status:${response.status}`)
        }
        return await response.json()
    } catch (err) {
        console.error("Error fetching products:", err.message);
        return null;
    }
}
async function getShop(params, signal) {
    try {
        let response = await fetch(`http://localhost:3000/api/shop/shops/${params.shopId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
            },
            signal: signal
        })

        if (!response.ok) {
            throw new Error(`error Status:${response.status}`)
        }
        return await response.json()
    } catch (err) {
        console.error("Error fetching products:", err.message)
        return null
    }
}
async function updateShop(params, formData) {
    try {
        let response = await fetch(`http://localhost:3000/api/shop/shops/${params.shopId}`, {
            method: "PUT",
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        if (!response.ok) {
            throw new Error(` error! Status:${response.status}`)
        }
        return await response.json()
    } catch (err) {
        console.error("Error fetching products:", err.message);
        return null
    }

}

async function urlToFile(url,filename,mimeType){
const response=await fetch(url);
const blob=await response.blob();
return new File([blob],filename,{type:mimeType})
}
export default function EditShop() {
    const [products, setProducts] = useState([]);
    const theme = useTheme()
    const { shopId } = useParams()
    // const [shop,setShop]=useState({})
    const [values, setValues] = useState({
        name: "",
        description: "",
        image: null,
        owner:{},
        created:"",
    })
    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        listByShop({
            shopId: shopId
        }, signal).then((data) => {
            if (data && data.error) {
                console.log("fetch products by id error", data.error)
            } else {
                setProducts(data.data)
            }
        })

    }, [shopId])

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        getShop({
            shopId: shopId
        }, signal).then(async (data) => {
           if(data && !data.error){
            const shop=data.data;
            let imageFile=null
            if(shop.image?.url){
                imageFile=await urlToFile(
                    shop.image.url,
                    shop.image.original_filename || 'photo.jpg',
                    'image/jpeg'
                )
            }
            console.log('dataata',shop)
            setValues({
                name:shop.name,
                description:shop.description,
                image:imageFile,
                url:shop.image?.url,
                owner:shop.owner,
                ownerId:shop.owner._id
            })
           }
        })

    }, [shopId])


    console.log('valuese',values)
    const getInput = (name) => (event) => {
        let value = event.target.value;
        if (name === 'image') {
            value = event.target.files[0]
        }
        setValues({ ...values, [name]: value })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData();
        console.log('values', values.image)
        formData.append('photo', values.image);
        formData.append('name', values.name);
        formData.append('description', values.description)

        console.log('image', values.image)
        updateShop({
            shopId: shopId
        }, formData).then(async (data) => {
            if(data && !data.error){
            const shop=data.data;
            let imageFile=null
            if(shop?.image?.url){
                imageFile=await urlToFile(
                    shop.image.url,
                    shop.image.original_filename || 'photo.jpg',
                    'image/jpeg'
                )
            }
            console.log('dataata',shop)
            setValues({
                name:shop.name,
                description:shop.description,
                image:imageFile,
                url:shop.image?.url,
                owner:shop.owner,
                ownerId:shop.owner._id
            })
           }
        })
    }

    alert(values.owner.name)
    return (<>
        <Paper style={{ marginBottom: theme.spacing(3), gridArea: 'editshop', paddingTop: theme.spacing(4) }}>
            <Container style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: theme.spacing(1) }}>
                <Typography variant="h4">Edit Shop</Typography>
                {values?.url && (
                    <Image
                        src={values.url}
                        width={120}
                        height={120}
                        alt="Preview"
                        style={{ borderRadius: '50%' }}
                        unoptimized
                    />
                )}
                <FormControl>
                    <Button component={'label'} sx={{
                        color: theme.palette.text.contrastText,
                        background: `linear-gradient(${theme.palette.primary.main} 5%,red 95%)`
                    }}>
                        <input type="file" id="image" style={{ display: 'none' }} onChange={getInput('image')} />
                        ChangePhoto<Upload />
                    </Button>
                </FormControl>
               
            </Container>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: theme.spacing(3),
                flexDirection: 'column',
                gap: theme.spacing(2)
            }}>
                <FormControl style={{ width: '50%' }}>
                    <FormLabel>Name</FormLabel>
                    <TextField
                        id="name"
                        type="text"
                        placeholder="Enter shop name here.."
                        required
                        variant="outlined"
                        color={'primary'}
                        value={values.name}
                        onChange={getInput('name')}
                    />
                </FormControl>
                <FormControl style={{ width: '50%', border: 'none' }}>
                    <FormLabel>Description</FormLabel>
                    <TextField
                        id="description"
                        type="text"
                        placeholder="Enter shop desc here.."
                        required
                        variant="outlined"
                        color={'primary'}
                        value={values.description}
                        onChange={getInput('description')}
                    />
                </FormControl>
                <Typography>Owner:{values?.owner?.name}</Typography>
                <Button variant="contained"
                    color='secondary'
                    onClick={(event) => handleSubmit(event)}
                >Update</Button>
            </Box>
        </Paper>
        <Paper style={{ gridArea: 'products' }}>
            <Box style={{
                position: 'sticky',
                display: 'flex',
                justifyContent: 'space-between',
                padding: theme.spacing(1),
                alignItems: 'center'
            }}>
                <Typography variant='h4' color="primary">Products</Typography>
                <Button color="primary"
                    variant="contained"
                    sx={{
                        color: theme.palette.text.contrastText,
                        background: `linear-gradient(${theme.palette.primary.main} 5%,red 95%)`
                    }}
                    LinkComponent={Link}
                    href={"/products/addNewP/" + shopId}
                >
                    <Add />NEW PRODUCT
                </Button></Box>
            <Products products={products || []} />
        </Paper>
    </>
    )
}