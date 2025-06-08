'use client'
import React from 'react';
import { Container, Paper, Typography, Avatar, Button, useTheme } from '@mui/material';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const ProfileDetailPage = ({ userData,session}) => {
 const theme=useTheme()
  const handleDelete=async ()=>{
    try{
     let response=await fetch(`http://localhost:3000/api/user/${session.user.id}`,{
       method:'DELETE',
       credentials:'include',
       headers:{
        'Content-Type':'application/json'
       }
     });
     if(!response.ok){
       throw new Error('Bad Delete Request')
     }
     const {message}=await response.json();
     alert(message)
 
     signOut({callbackUrl:'/'})
    }catch(err){
      console.log('error in delete user client api',err)
    }
  }

  return (
    <Container maxWidth="lg" style={{marginTop:theme.spacing(1)}}>
      <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
        <Avatar
          src={userData?.image?.url}
          alt="Profile Picture"
          sx={{ width: 100, height: 100, margin: 'auto' }}
          
        />
        <Typography variant="h5" sx={{ marginTop: 2 }}>
          {userData?.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {userData?.email}
        </Typography>
        <Typography variant="p" color='text.secondary' sx={{ marginTop: 2,display:'block'}}>
           <Typography variant='h4' color='text.secondary' >Bio</Typography>
          {userData?.about}
        </Typography>
        {
          session.user.id === userData._id && (
            <>
              <Button variant="contained" color="primary" sx={{ marginTop: 3 }} component={Link} href={'/user/editprofile/'+userData._id}>
                Edit Profile
              </Button>
              <Button variant='contained' color='secondary' sx={{ marginTop: 3, marginLeft: 2 }} onClick={handleDelete}>
                Delete Account
              </Button>
            </>)
        }
      </Paper>
    </Container>
  );
};

export default ProfileDetailPage;