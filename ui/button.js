import React from 'react';
import {makeStyles} from '@mui/styles'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// Define custom styles using makeStyles
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: '8px 16px',
    textTransform: 'none',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  iconButton: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
}));

// Generalized Button Component
export default function DynamicButton({ ButtonComponent, children, ...props }) {
  const classes = useStyles();

  return (
    <ButtonComponent
      className={
        ButtonComponent === IconButton ? classes.iconButton : classes.root
      }
      {...props}
    >
      {children}
    </ButtonComponent>
  );
}