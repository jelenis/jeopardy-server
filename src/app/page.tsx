'use client';
import React, { useEffect, useState } from 'react';
import { Skeleton, Paper, Tabs, Tab, Container, Box, Typography, InputBase, InputAdornment, NoSsr, Button } from '@mui/material';
import styles from './page.module.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';


import { Poppins, Montserrat } from 'next/font/google'
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '800'],
  display: 'swap',
  variable: '--font-poppins',
})
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
})
const theme = createTheme({
  palette: {

    main: "#7f7f7f",
    // secondary: '#809fff',
    light: '#80BFFF',
    light2: "#BF80FF",
    light3: "#fbfbfb",
    dark: '#2d2d2d',
    accent: '#FFFF80',


  },
  typography: {
    fontFamily: 'var(--font-poppins), var(--font-montserrat), sans-serif',
    h4: { fontSize: "3rem", fontFamily: 'var(--font-poppins)', fontWeight: 600 },
    h5: { fontSize: "1.5rem", fontFamily: 'var(--font-montserrat)', fontWeight: 300 },
    h6: { fontSize: "1.1rem", fontFamily: 'var(--font-montserrat)' }
  },
})





export default function Page() {
  // This is a placeholder for the main page content.
  // You can add your components and logic here.
  return (
    <Container className={`${poppins.variable} ${montserrat.variable}`} >
      <ThemeProvider theme={theme}>
        <Box sx={{  display: 'flex', alignItems: 'flex-start', flexDirection: {  xs: 'column', lg: 'row' } }}>

          {/* Left Column */}
          <Box
            
            sx={{
              position: {xs: 'static', md: 'sticky'},
              width: { xs: '100%', md: 'auto' }, // fill width on small screens, fixed width on larger
              top: "10vh",
              flex: '0 0 auto', // fixed width
              overflowY: 'auto', // optional, if content can overflow
              boxSizing: 'border-box',
              mt: "10vh",
            }}
          >

            <Typography variant='h4' noWrap sx={{ color: 'main' }}>
              John-Anthony Elenis
            </Typography>

            <Typography variant='h5' noWrap sx={{ color: 'text.secondary' }}>
              Junior Software Developer
            </Typography>

            <Typography variant='h6' noWrap sx={{ color: 'text.secondary', mt: 2 }}>
              Download my resume to learn more about my
              <br/>work history and time in grad school.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button variant='contained'
                sx={{
                  bgcolor: 'light2',
                  borderRadius: '16px 16px',
                  fontSize: '1.5rem',
                }}>Resume</Button>
            </Box>
          </Box>

          {/* Right Column (scrolls the page) */}

          <Box sx={{ flex: 1, p: 2 , mt: "10vh",}}>
            {Array.from({ length: 100 }).map((_, i) => (
              <Typography key={i} paragraph>
                Scrollable Item #{i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
            ))}
          </Box>
        </Box>





      </ThemeProvider>
    </Container>
  );
}