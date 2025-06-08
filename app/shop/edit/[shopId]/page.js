'use client'
import { Upload } from "@mui/icons-material";
import { Avatar, Box, Button, Card, Container, FormControl, FormLabel, IconButton, Paper, TextField, Typography, useTheme } from "@mui/material";

export default function EditShop() {
    const theme = useTheme()
    return (<>
        <Paper style={{ marginBottom: theme.spacing(3), gridArea: 'editshop', paddingTop: theme.spacing(4) }}>
            <Container style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: theme.spacing(1) }}>
                <Typography variant="h4">Edit Shop</Typography>
                <Avatar />
                <FormControl>
                    <input type="file" id="photo" style={{ display: 'none' }} />
                </FormControl>
                <IconButton sx={{
                    color: theme.palette.text.contrastText,
                    background: `linear-gradient(${theme.palette.primary.main},green)`,
                    borderRadius: theme.spacing(0)
                }}>
                    ChangePhoto<Upload />
                </IconButton>
            </Container>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: theme.spacing(3),
                flexDirection: 'column',
                gap: theme.spacing(2)
            }}>
                <FormControl style={{width:'50%'}}>
                    <FormLabel>Name</FormLabel>
                    <TextField
                        id="name"
                        type="text"
                        placeholder="Enter shop name here.."
                        required
                        variant="outlined"
                        color={'primary'}
                    />
                </FormControl>
                <FormControl style={{width:'50%',border:'none'}}>
                    <FormLabel>Description</FormLabel>
                    <TextField
                        id="name"
                        type="text"
                        placeholder="Enter shop name here.."
                        required
                        variant="outlined"
                        color={'primary'}
                        
                    />
                </FormControl>
                <Typography>Owner:</Typography>
                <Button variant="contained"
                    color= 'secondary'
                   >Update</Button>
            </Box>
        </Paper>
        <Paper style={{ background: 'red', gridArea: 'products' }}>

        </Paper>
    </>
    )
}