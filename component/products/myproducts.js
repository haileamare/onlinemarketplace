'use client'
import { AddShoppingCart } from "@mui/icons-material"
import { CardContent,Card, CardMedia, Grid, IconButton, Typography, Link } from "@mui/material"

export default function Products({products,searched}){
  console.log('productsbsyhop',products)
  return(
    <Grid container spacing={2} columns={3}>
       {products?.map((product,i)=>(
        <Grid item key={i} xs={12} sm={16} md={4} >
            <Card>
                <Link href={`/product/${product._id}`}>
                  <CardMedia
                    component={'img'}
                    height="200"
                    image={`${product.image.url}`}
                    alt={product.name}
                  />
                </Link>
                <CardContent>
                    <Typography variant='h6'>
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </Typography>
                    <Typography variant="body2" color='textSecondary'>
                        ${product.price}
                    </Typography>
                    <IconButton color="primary">
                        <AddShoppingCart/>
                    </IconButton>
                </CardContent>
            </Card>
        </Grid>
       ))}
    </Grid>
  )
}