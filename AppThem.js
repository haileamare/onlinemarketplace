'use client';
import { createTheme, ThemeProvider } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import { InputCustomization } from "./customizations/input";
import { getDesignTokens } from "./theme"; // This function returns tokens for 'light' or 'dark'
import { dataDisplayCustomizations } from "./customizations/displayData";
import { navigationCustomizations } from "./customizations/navigation";

export const MyContext = createContext();

export default function AppTheme(props) {
  const [mode, setMode] = useState('light');
  const { children, disableCustomeTheme, themeComponents } = props;

  const theme = useMemo(() => {
    return disableCustomeTheme
      ? {}
      : createTheme({
        breakpoints:{
           
        },
          ...getDesignTokens(mode), // Include palette tokens based on the mode
          cssVariables: {
            colorSchemeSelector: 'data-mui-color-scheme',
            cssVarPrefix: 'template'
          },
          components: {
            ...InputCustomization,
            ...dataDisplayCustomizations,
            ...navigationCustomizations,
            ...themeComponents
          }
        });
  }, [mode, disableCustomeTheme, themeComponents]); // Make sure to include mode here

  return (
    <MyContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </MyContext.Provider>
  );
}