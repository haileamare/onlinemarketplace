'use client'
import { Add, Delete, Edit } from "@mui/icons-material";
import { Avatar, Box, Container, Divider, IconButton, List, ListItem, ListItemAvatar, Typography, useTheme } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

export default function MyShopsUi(props) {
    console.log('shops', props.shops)
    const router = useRouter()
    const theme = useTheme()
    const { data: session, status } = useSession();
    const [shops, setShops] = useState([...props.shops])

    if (status === 'unauthenticated') {
        router.push('/signin')
    }
    if (status === 'loading') {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "100vh" }}>Loadding.....</div>
    }

    const removeShop = async (shop) => {
        const updatedShops = [...shops]
        const shopId=shop._id.toString()
        console.log('shopId',shop._id.toString(), 'shop',shop)
        alert('shopId',shop._id.toString())
        const index = updatedShops.indexOf(shop)
        updatedShops.splice(index, 1);
        setShops(updatedShops)

        try {
            let response = await fetch(`/api/shop/shops/${shopId}`, {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
        
        
            if (!response.ok) {
                throw new Error('error on delete api ')
            }
            let { message } = await response.json()
            console.log('delete', message)
        } catch (e) {
            console.log('error', e.message)
        }
    }
    return (<>
        <Container maxWidth='lg' style={{
            padding: '1rem', background: theme.palette.background.paper,
            width: '100%',
            height: '100vh',
            padding: theme.spacing(4),
            paddingTop: theme.spacing(6),
            margin: theme.spacing(.5),
            marginInline: 'auto'
        }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: theme.spacing(1),
                left: '0px',
                width: '100%'
            }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'lightgreen' }}>Your Shops</Typography>
                <IconButton sx={{
                    color: theme.palette.text.contrastText,
                    background: `linear-gradient(${theme.palette.primary.main},green)`,
                    borderRadius: theme.spacing(0)
                }}>
                    <Add />NewShop
                </IconButton>
            </Box>
            <List>
                {shops.map((shop, i) => (
                    <Fragment key={shop._id}>
                        {i !== 0 && <Divider />}
                        <ListItem
                            secondaryAction={
                                <>
                                    {/* Edit Button */}
                                    <IconButton
                                        style={{ background: "transparent", float: "left" }}
                                        onClick={() => router.push("/myshops/" + session.user.id)}
                                    >
                                        <Edit
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                color: theme.palette.text.primary,
                                            }}
                                        />
                                    </IconButton>

                                    {/* Delete Button (Properly placed outside Link) */}
                                    <IconButton
                                        style={{ background: "transparent" }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeShop(shop);
                                        }}
                                    >
                                        <Delete
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                color: theme.palette.text.primary,
                                            }}
                                        />
                                    </IconButton>
                                </>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar
                                    src={shop.image.url}
                                    alt={shop.image.original_filename}
                                    sx={{ width: "100px", height: "100px", marginRight: theme.spacing(2) }}
                                />
                            </ListItemAvatar>

                            {/* Wrap Only the Text in Link */}
                            <Link
                                href={"/shop/edit/" + shop._id}
                                style={{
                                    textDecoration: "none",
                                    color: theme.palette.text.primary,
                                }}
                            >
                                <div>
                                    <Typography variant="h5">{shop.name}</Typography>
                                    <Typography variant="body2">{shop.description}</Typography>
                                </div>
                            </Link>
                        </ListItem>
                        <Divider />
                    </Fragment>
                ))}
            </List>
        </Container >
    </>
    )
}