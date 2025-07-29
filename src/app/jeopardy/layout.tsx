import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import { Box, CssBaseline } from '@mui/material';



export const metadata: Metadata = {
  title: "jeopardy (unoffical)",
  description: "",
  // viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
};

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body  >
        <AppRouterCacheProvider>
     
            <Box className={roboto.variable}
                sx={{
                  bgcolor: '#2d2d2d', // dark indigo 
                  minHeight: '100vh',
                  color: 'white',
                  px: 0,
                  py: 0,
                }}
            >
              {children}
            </Box>
  
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
