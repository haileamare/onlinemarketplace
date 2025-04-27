'use client';
import React, { useContext, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Nav from '@/component/nav/nav';
import AppTheme from '@/AppThem';
import { SessionProvider } from 'next-auth/react';

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <SessionProvider>
            <AppTheme>
              <CssBaseline />
              <Nav />
              {children}
            </AppTheme>
          </SessionProvider>

        </AppRouterCacheProvider>
      </body>
    </html>
  );
}