'use client'
import { useTheme } from "@emotion/react";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Container, FormControl, FormLabel, Stack, styled, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import {signIn, useSession} from 'next-auth/react'
import { useRouter } from "next/navigation";
const SignInContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4),
    },
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      zIndex: -1,
      inset: 0,
      backgroundImage:
        'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
      backgroundRepeat: 'no-repeat',
      ...theme.applyStyles('dark', {
        backgroundImage:
          'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
      }),
    },
  }));

const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    width: '40%',
    marginInline: 'auto',
    paddingInline: theme.spacing(1),
    [theme.breakpoints.down('md')]:{
        width:'60%'
    },
    [theme.breakpoints.down('sm')]:{
        width:'100%'
    },
}))


export default function SignInForm() {
    const [values,setValues]=useState({
        name:'',
        email:'',
        password:''
    });
    const router=useRouter()
    const theme = useTheme()
    
    const getInput=(name)=>(event)=>{
        setValues({...values,[name]:event.target.value})
    }
    const handleSubmit=async (event)=>{
        event.preventDefault()
        
        try{
            let res=await signIn('credentials',{...values,redirect:false});
            if(res.ok){
                console.log('result',res)
                router.push('/')
            }else{
                console.log('error',res)
            }
            
        }catch(err){
            console.log('error in signup',err)
        }
    }
    const {session}=useSession();
    console.log('session',session)
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
                     <Box sx={{textAlign:'center'}} component={Typography} variant="h6">Register new account?<Link href={'/signup'}>Signun</Link></Box>
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </Box>
            </StyledCard>

        </SignInContainer>
    )
}