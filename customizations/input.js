import { gray,brand } from "@/theme";
import { alpha, outlinedInputClasses } from "@mui/material";

export const InputCustomization={
    MuiInputBase: {
        styleOverrides: {
          root: {
            border: 'none',
          },
          input: {
            '&::placeholder': {
              opacity: 0.7,
              color: gray[500],
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          input: {
            padding: 0,
          },
          root: ({ theme }) => ({
            padding: '8px 12px',
            color: (theme.vars || theme).palette.text.primary,
            borderRadius: (theme.vars || theme).shape.borderRadius,
            border: `1px solid ${(theme.vars || theme).palette.divider}`,
            backgroundColor: (theme.vars || theme).palette.background.default,
            transition: 'border 120ms ease-in',
            '&:hover': {
              borderColor: gray[400],
            },
            [`&.${outlinedInputClasses.focused}`]: {
              outline: `3px solid ${alpha(brand[500], 0.5)}`,
              borderColor: brand[400],
            },
            ...theme.applyStyles('dark', {
              '&:hover': {
                borderColor: gray[500],
              },
            }),
            variants: [
              {
                props: {
                  size: 'small',
                },
                style: {
                  height: '2.25rem',
                },
              },
              {
                props: {
                  size: 'medium',
                },
                style: {
                  height: '2.5rem',
                },
              },
            ],
          }),
          notchedOutline: {
            border: 'none',
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: (theme.vars || theme).palette.grey[500],
            ...theme.applyStyles('dark', {
              color: (theme.vars || theme).palette.grey[400],
            }),
          }),
        },
      },
}