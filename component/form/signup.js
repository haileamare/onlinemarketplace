'use client'
import { useTheme } from "@emotion/react";
import { Box, Button, FormControl, FormLabel,  TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { StyledCard,SignInContainer } from "./stylecom";

export default function SignUpForm() {
    const [values,setValues]=useState({
        name:'',
        email:'',
        password:''
    });

    const theme = useTheme()

    const getInput=(name)=>(event)=>{
        setValues({...values,[name]:event.target.value})
       }
    const handleSubmit=async (event)=>{
        event.preventDefault()

        try{
            let result =await fetch('/api/user/signup',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(values)
            });
            let data=await result.json();
            console.log('data',data)
        }catch(err){
          console.log('error in signup',err)
        }
    }
    return (
        <SignInContainer sx={{ padding: theme.spacing(2) }}>
            <StyledCard>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >SignUp
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
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <TextField
                            placeholder="••••••"
                            type="password"
                            value={values.password}
                            id="password"
                            autoComplete="current-password"
                            required
                            fullWidth
                            variant="outlined"
                            color={'primary'}
                           onChange={getInput('password')}
                        />
                    </FormControl>
                     <Box sx={{textAlign:'center'}} component={Typography} variant="h6">Already have an account?<Link href={'/signin'}>Signin</Link></Box>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </Box>
            </StyledCard>

        </SignInContainer>
    )
}