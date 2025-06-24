'use client'
import { AddShoppingCart, Delete, Edit } from "@mui/icons-material";
import {  Typography, List, ListItem, ListItemAvatar, ListItemText, useTheme, ListItemButton } from "@mui/material";
import Image from "next/image";

export default function Products({ products }) {
  const theme = useTheme()
  return (
    <List>
      {products.map((product, i) => (
        <ListItem key={i} sx={{ display: "flex", mb: 2, gap: theme.spacing(2), alignItems: 'center' }}>
          <ListItemAvatar>
            <Image
              width={120}
              height={120}
              unoptimized
              src={product.image.url}
              style={{ objectFit: 'cover' }}
              alt={product.image.original_filename}
            />
          </ListItemAvatar>
          <ListItemText secondary={
            <Typography variant="p">Quantity:{product.quantity}|Price:{product.price}$</Typography>
          }>
            <Typography variant="h2" color="primary">{product.name}</Typography>
          </ListItemText>
          <div style={{display:'flex'}}>
            <ListItemButton style={{ alignSelf: 'center' }}>
              Edit <Edit />
            </ListItemButton>
            <ListItemButton style={{ alignSelf: 'center' }}>
              Delete<Delete />
            </ListItemButton>

          </div>
        </ListItem>
      ))}
    </List>
  );
}