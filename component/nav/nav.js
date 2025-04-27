'use client'
import Link from "next/link";
import { AppBar, Box, Button, IconButton, styled, Toolbar, Tooltip, useTheme } from "@mui/material";
import { Home, Menu, ShoppingCart } from "@mui/icons-material";
import ColorModeSelect from '@/component/colorselectmode/ColorModeSelect';
import { useContext, useEffect } from "react";
import { MyContext } from "@/AppThem";
import { signOut, useSession } from "next-auth/react";


// Styled Button


const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'static',
  backgroundColor: theme.palette.background.default,
  boxShadow: '0 4px 6px rgba(0,0,0,.1)',
  width: '100%',
  // [theme.breakpoints.down('md')]:{
  //   display:'flex',
  //   justifyContent:'start',
  //   '& .MuiIconButton-root': {
  //     display:'block',
  //     marginRight:'auto'
  // },
  // '& .MuiToolbar-root':{
  //   display:'none'
  // },

  // }
}))
export default function Nav() {
  const { mode, setMode } = useContext(MyContext)
  const theme = useTheme();
  const { data:session,status } = useSession();

  if(status==='loading'){
    return (<div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}>Loading ....</div>)
  }
 

  const StyledButton = styled(Button)(({ theme }) => ({
    padding: '8px 16px',
    textTransform: 'none',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '10px',
      color: 'red'
    }
  }));

  // Styled IconButton
  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    padding: '8px 16px',
    color: theme.palette.primary.main,
    textTransform: 'none',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  }));



  const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(1),
  }));



  return (
    <StyledAppBar>
      <IconButton sx={{ display: "none" }} ><Menu /></IconButton>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <StyledBox>
          <StyledIconButton href="/" component={Link}>
            Mern Marketplace <Home />
          </StyledIconButton>
          <StyledButton component={Link} href="/shopes">
            AllSHOPS
          </StyledButton>
          <StyledIconButton component={Link} href="/cart">
            CART <ShoppingCart />
          </StyledIconButton>
        </StyledBox>
        <StyledBox>
          <StyledButton component={Link} href="/user/shopes">
            MYSHOPS
          </StyledButton>
          {session && (<StyledButton component={Link} href={"/user/"+session.user.id}>
            MyPROFILE
          </StyledButton>)}
          {session && (<StyledButton onClick={()=>signOut()}>
            SIGNOUT
          </StyledButton>)}
          {!session && (<><StyledButton LinkComponent={Link} href="/signin">
            SIGNIN
          </StyledButton>
            <StyledButton LinkComponent={Link} href="/signup">
              SIGNUP
            </StyledButton></>)}
        </StyledBox>
        <ColorModeSelect
          value={mode}
          onChange={(event) => setMode(event.target.value)}
        />
      </Toolbar>
    </StyledAppBar>
  );
}