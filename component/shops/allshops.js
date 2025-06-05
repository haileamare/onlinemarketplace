'use client'
import { Avatar, Box, Container, Divider, Link, ListItem, ListItemAvatar, Typography, useTheme } from "@mui/material"

export default function AllShops({ shops }) {
    const theme = useTheme()
    return (
        <Container style={{background:theme.palette.background.paper,
        width:'100%',
        height:'100vh',
        padding:theme.spacing(0),
        margin:theme.spacing(.5),
        marginInline:'auto'
        }}>
             <h1 style={{display:'flex',justifyContent:'center'
                        ,alignItems:'center'}}>All Retail Shops</h1>
            {shops.map((shop, i) => (
               
                    <Link to={'/'} key={i} sx={{ textDecoration: 'none',color:theme.palette.text.primary}}>
                        <Divider />
                        <ListItem >
                            <ListItemAvatar>
                                <Avatar src={shop.image.url} alt={shop.image.original_filename} sx={{width:'100px',height:'100px'}} />
                            </ListItemAvatar>
                            <div style={{ background: theme.palette.background.paper,marginLeft:theme.spacing(3) }}>
                                <Typography type="headline"
                                  variant="h5" color="primary">
                                    {shop.name}
                                </Typography>
                                <Typography type='subheading' component={'h4'}>
                                    {shop.description}
                                </Typography>
                            </div>
                        </ListItem>
                        <Divider />
                    </Link>

            ))
            }
        </Container>

    )
}