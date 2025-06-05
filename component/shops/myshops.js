'use client'
import { Add, Edit } from "@mui/icons-material";
import { Link as MuiLink,Avatar, Box, Container, Divider, IconButton, ListItem, ListItemAvatar, Typography, useTheme } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from 'next/link'
import { useRouter } from "next/navigation";
export default function MyShopsUi({ shops }) {
    const router=useRouter()
    const theme=useTheme()
    const {data:session,status}=useSession();
    
    if(status==='unauthenticated'){
       router.push('/signin')
    }
    if(status==='loading'){
        return <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:"100vh"}}>Loadding.....</div>
    }
    
    return (
        <Container maxWidth='lg' style={{ padding: '1rem',background:theme.palette.background.paper,
            width:'100%',
            height:'100vh',
            padding:theme.spacing(3),
            margin:theme.spacing(.5),
            marginInline:'auto'
        }}>
            <Box sx={{display:'flex',justifyContent:'space-between',marginBottom:theme.spacing(1)}}>
                <Typography variant="h4" sx={{fontWeight:'bold',color:'lightgreen'}}>Your Shops</Typography>
                <IconButton sx={{
                    color:theme.palette.text.contrastText,
                    background:`linear-gradient(${theme.palette.primary.main},green)`,
                    borderRadius:theme.spacing(0)}}>
                    <Add/>NewShop
                    </IconButton>
            </Box>
            {shops.map((shop,i) => (
                < Link href={'/'} key={i} style={{
                    textDecoration:'none',
                    color:theme.palette.text.primary,
                }}>
                    {i==0?'':<Divider />}
                    <ListItem secondaryAction={
                        <>
                           <IconButton style={{background:'transparent'}}  onClick={()=>router.push('/myshops/'+session.user.id)}
                           >
                            <Edit style={{width:'30px',height:'30px',color:theme.palette.text.primary}} />
                           </IconButton>
                    
                        </>
                    }>
                        <ListItemAvatar>
                            <Avatar src={shop.image.url} alt={shop.image.original_filename}
                            sx={{width:'100px',height:'100px',marginRight:theme.spacing(2)}}/>
                        </ListItemAvatar>
                        <div>
                            <Typography variant="h5">
                                {shop.name}
                            </Typography>
                            <Typography variant="">
                                {shop.description}
                            </Typography>
                        </div>
                    </ListItem>
                    <Divider />
                </Link>
            ))
            }
        </Container >
    )
}