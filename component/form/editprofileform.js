'use client'
import { FileUpload, Visibility, VisibilityOff } from "@mui/icons-material"
import { StyledCard,SignInContainer } from "./stylecom"
import { useState } from "react"
import { useTheme } from "@emotion/react"
import { Box, Typography,FormControl,FormLabel,TextField,Button, Checkbox, IconButton, TextareaAutosize } from "@mui/material"
export default function EditProfileForm({userData}){
    const theme=useTheme()
    const [type,setType]=useState('password')
    const [values,setValues]=useState({
        name:userData.name,
        email:userData.email,
        password:'',
        photo:{},
        checked:userData.seller,
        about:''
    })
    const handleType=()=>{
        const value=type=='password'?'text':'password'
        setType(value)
    }
    const handleSubmit=async (e)=>{
        e.preventDefault()
    
       let formData=new FormData()

       formData.append('name',values.name);
       formData.append('email',values.email);
       formData.append('password',values.password)
       formData.append('photo',values.photo),
       formData.append('seller',values.checked)
       formData.append('about',values.about)

       try{
        let resulte=await fetch(`/api/user/${userData._id}/update/`,{
            method:'PUT',
            credentials:'include',
            body:formData
        })
       const {data}=await resulte.json()
       setValues({...values,...data})
       }catch(err){
          console.log('error edit',err)
       }
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
    console.log('valuessssss',values.photo)
    return (
                <SignInContainer sx={{ padding: theme.spacing(2) ,height:'auto'}}>
                    <StyledCard>
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                        >Edit Profile
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
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <TextField
                                    id="email"
                                    type="email"
                                    value={values.email}
                                    placeholder="your@email.com"
                                    autoComplete="email"
                                    required
                                    fullWidth
                                    variant="outlined"
                                    color={'primary'}
                                    onChange={getInput('email')}
                                />
                            </FormControl>
                            <FormControl>
                                <div >
                                <FormLabel htmlFor="password">New Password</FormLabel>
                                <TextField
                                    placeholder="new password here..."
                                    type={type}
                                    value={values.password}
                                    id="password"
                                    autoComplete="current-password"
                                    required
                                    fullWidth
                                    variant="outlined"
                                    color={'primary'}
                                   onChange={getInput('password')}
                                />
                                <IconButton style={{position:'absolute',right:theme.spacing(1)}} onClick={handleType}>
                                    {type=='password'?<Visibility/>:<VisibilityOff/>}
                                </IconButton>
                                </div>
                            </FormControl>
                            <FormControl>
                                <FormLabel>About yourself</FormLabel>
                                <TextareaAutosize value={values.about} onChange={getInput('about')} style={{backgroundColor:theme.palette.background.default,padding:theme.spacing(1)}}/>
                            </FormControl>
                            <div style={{display:'flex',justifyContent:'start',alignItems:'center'}}>
                                <FormLabel htmlFor="checkbox">Is Seller? 
                                <Checkbox
                                   checked={values.checked}
                                    id="checkbox"
                                    variant="outlined"
                                    color={'primary'}
                                   onChange={()=>setValues({...values,checked:values.checked?false:true})}
                                />{values.checked?'Yes':'No'}</FormLabel>
                            </div>
                            <FormControl sx={{display:'flex',justifyContent:'start',alignItems:'center'}}>
                                <FormLabel htmlFor="photo" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>Upload Photo {values?.photo?.name} <FileUpload/></FormLabel>
                                <TextField
                                    style={{display:'none'}}
                                    type="file"
                                    name='photo'
                                    id="photo"
                                    fullWidth
                                    variant="outlined"
                                    color={'primary'}
                                   onChange={getInput('photo')}
                                />

                            </FormControl>
                            <Button type="submit" variant="contained" color="primary">Submit</Button>
                        </Box>
                    </StyledCard>
        
                </SignInContainer>
    )
}