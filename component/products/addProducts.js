'use client'
import { FileUpload, Visibility, VisibilityOff } from "@mui/icons-material"
import { useState } from "react"
import { useTheme } from "@emotion/react"
import { Box, Typography,FormControl,FormLabel,TextField,Button, Checkbox, IconButton, TextareaAutosize } from "@mui/material"
import { SignInContainer, StyledCard } from "../form/stylecom"

export default function AddNewProductUi({shopId}){
    const [product,setProduct]=useState({})
    const theme=useTheme()
    const [type,setType]=useState('password')
    // const {data:session,update}=useSession()
    // const updateSessionData=async ()=>{
    //     await update();
    // }
    
    const [values,setValues]=useState({
        name:'',
        description:'',
        category:'',
        quantity:{},
        price:'',
        photo:{}
    })
    const handleType=()=>{
        const value=type=='password'?'text':'password'
        setType(value)
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()
    
       let formData=new FormData()

       formData.append('name',values.name);
       formData.append('description',values.description);
       formData.append('quantity',values.quantity)
       formData.append('photo',values.photo),
       formData.append('price',values.price)
       formData.append('category',values.category)

       try{
        let response=await fetch(`/api/product/${shopId}`,{
            method:'POST',
            credentials:'include',
            body:formData
        })
        if(!response.ok){
            throw new Error('error in the editprofile apis ')
        }
       const {data}=await response.json()
       setProduct({...data.data})
       }catch(err){
          console.log('error edit',err)
       }

    //    setValues({
    //     name:"",
    //     category:"",
    //     image:"",
    //     price:"",
    //     quantity:"",
    //     description:""
    //    })
    }
    const getInput=(name)=>(event)=>{
        let value=''
        if(name==='photo'){
            value=event.target.files[0]
            //setSelectedFilename(event.target.files[0].name)
            alert('value,value')
        }else{
            value=event.target.value
        }
       setValues({...values,[name]:value})
    }
   
    return (
                <SignInContainer sx={{ padding: theme.spacing(2) ,height:'auto'}}>
                    <StyledCard>
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                        >Add New Product
                        </Typography>
                        <Box
                            component={'form'}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: theme.spacing(2),
                                padding:theme.spacing(2),
                                paddingBottom:theme.spacing(3)
                            }}
                            onSubmit={handleSubmit}
                        >
                            <FormControl>
                                <FormLabel htmlFor="name">Name</FormLabel>
                                <TextField
                                    id="name"
                                    type="text"
                                    autoFocus
                                    value={values.name}
                                    placeholder="Enter full name"
                                    required
                                    fullWidth
                                    variant="outlined"
                                    color={'primary'}
                                    onChange={getInput('name')}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="description">description</FormLabel>
                                <TextField
                                    id="description"
                                    type="text"
                                    value={values.description}
                                    placeholder="description about the Prod..."
                                    required
                                    fullWidth
                                    variant="outlined"
                                    color={'primary'}
                                    onChange={getInput('description')}
                                />
                            </FormControl>
                            <FormControl>
                                <div >
                                <FormLabel htmlFor="category">category</FormLabel>
                                <TextField
                                    placeholder="the category of this produ..."
                                    type='text'
                                    value={values.category}
                                    id="category"
                                    required
                                    fullWidth
                                    variant="outlined"
                                    color={'primary'}
                                   onChange={getInput('category')}
                                />
                        
                                </div>
                            </FormControl>
                            <FormControl>
                                <div >
                                <FormLabel htmlFor="quantity">Quantity</FormLabel>
                                <TextField
                                    placeholder="the quantity of this produ..."
                                    type='number'
                                    value={values.quantity}
                                    id="quantity"
                                    required
                                    fullWidth
                                    variant="outlined"
                                    color={'primary'}
                                   onChange={getInput('quantity')}
                                />
                        
                                </div>
                            </FormControl>
                            <FormControl>
                                <div >
                                <FormLabel htmlFor="quantity">Price</FormLabel>
                                <TextField
                                    placeholder="the price of one produ..."
                                    type='number'
                                    value={values.price}
                                    id="price"
                                    required
                                    fullWidth
                                    variant="outlined"
                                    color={'primary'}
                                   onChange={getInput('price')}
                                />
                        
                                </div>
                            </FormControl>
                            <FormControl sx={{display:'flex',justifyContent:'start',alignItems:'center'}}>
                                <FormLabel htmlFor="image" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>Upload Photo {values?.photo?.name} <FileUpload/></FormLabel>
                                <input
                                    style={{display:'none'}}
                                    type="file"
                                    name='photo'
                                    id="image"
                                   onChange={getInput('photo')}
                                />
                                {values.photo.name}
                            </FormControl>
                            <Button type="submit" variant="contained" color="primary">Submit</Button>
                        </Box>
                    </StyledCard>
        
                </SignInContainer>
    )
}