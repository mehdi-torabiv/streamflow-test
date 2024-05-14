'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';
import {
  Box,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import configs from '@/configs';
import Appbar from '@/components/layouts/Appbar';
import Sidebar from '@/components/layouts/Sidebar';
import { SnackbarProvider } from '@/context/SnackbarContext';
import { useState } from 'react';

const WalletProvider = dynamic(() => import('@/providers/WalletProvider'), {
  ssr: false,
});

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <html lang="en">
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={configs.theme}>
          <body className={inter.className} suppressHydrationWarning={true}>
            <CssBaseline />
            <SnackbarProvider>
              <WalletProvider>
                <Appbar onMenuClick={handleDrawerToggle} />
                <Box display="flex">
                  <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                  <Box flexGrow={1} p={2}>
                    {children}
                  </Box>
                </Box>
              </WalletProvider>
            </SnackbarProvider>
          </body>
        </ThemeProvider>
      </StyledEngineProvider>
    </html>
  );
}
