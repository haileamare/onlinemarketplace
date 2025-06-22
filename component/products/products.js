'use client'

import { AddShoppingCart } from "@mui/icons-material";
import { Card, CardContent, IconButton, Typography, List, ListItem } from "@mui/material";
import Image from "next/image";
import { Link } from "react-router-dom";

export default function Products({ products }) {
  return (
    <List>
      {products.map((product, i) => (
        <ListItem key={i} sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
          <Card sx={{ width: "100%" }}>
            <Link to={`/product/${product._id}`}>
              <Image
                height="200"
                image={`/api/product/image/${product._id}`}
                alt={product.name}
              />
            </Link>
            <CardContent>
              <Typography variant="h6">
                <Link to={`/product/${product._id}`}>{product.name}</Link>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ${product.price}
              </Typography>
              <IconButton color="primary">
                <AddShoppingCart />
              </IconButton>
            </CardContent>
          </Card>
        </ListItem>
      ))}
    </List>
  );
}