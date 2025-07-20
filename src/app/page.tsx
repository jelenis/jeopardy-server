'use client';
import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Button, Divider } from '@mui/material';
import styles from './page.module.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AnimatedWaves from './components/AnimatedWaves';
import WordCycle from './components/WordCycle';
import { Poppins, Montserrat, Dancing_Script, Lobster } from 'next/font/google'
import SocialLinks from './components/SocialLinks';
import DownloadIcon from '@mui/icons-material/Download';


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
});

const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', ],
  display: 'swap',
  variable: '--font-dancing-script',
});
const lobster = Lobster({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-lobster',
});

const theme = createTheme({
  palette: {

    main: "#219ebc",
    light: '#8ecae6',
    light2: '#80BFFF',
    light3: "#BF80FF",
    light4: "#fbfbfb",
    dark: '#273F4F',
    accent: '#ffb703',


  },
  typography: {
    fontFamily: 'var(--font-poppins), var(--font-montserrat), sans-serif',
    
    h4: { fontSize: "3rem", fontFamily: 'var(--font-poppins)', fontWeight: 600 },
    h5: { fontSize: "1.5rem", fontFamily: 'var(--font-montserrat)', fontWeight: 300 },
    h6: { fontSize: "1.1rem", fontFamily: 'var(--font-montserrat)' }
  },
})





export default function Page() {
  return (
    <div>
  
      <AnimatedWaves />

    <Container className={`${poppins.variable} ${montserrat.variable} ${dancing.variable} ${lobster.variable}`} >
      <ThemeProvider theme={theme}>
        <Box sx={{display: 'flex',}}>

        </Box>
        <Box sx={{  display: 'flex', alignItems: 'flex-start', flexDirection: {  xs: 'column', md: 'row' } }}>

          {/* Left Column */}
          <Box
            
            sx={{
              position: {xs: 'static', md: 'sticky'},
              width: { xs: '100%', md: 'auto' }, // fill width on small screens, fixed width on larger
              top: "2.5rem",
              flex: '0 0 auto', // no shrink, no grow, fixed width
              overflowY: 'auto', 
              boxSizing: 'border-box',
              pr: 10,
            }}
          >

            <Typography variant="h3" noWrap fontWeight={800} sx={{ pl: 1, fontSize: "4rem", fontFamily: "var(--font-dancing-script)", color: 'main' }}>
              John <Box component="span" sx={{  }}>Elenis</Box>
            </Typography>

            <Typography variant='h5' noWrap sx={{ color: 'text.secondary' }}>
              Junior Software Developer
            </Typography>

            <Typography variant='h6' noWrap sx={{ color: 'text.secondary', mt: 2 }}>
              Want to know more? My resume covers <br />
              my work experience  and time in grad school.
            </Typography>
            
            <Box sx={{ 
              display: 'flex',
              direction: 'row',
              alignItems: 'center',
              mt: 2,
              pb: 2,}}>
              <Button variant='contained'
                sx={{
                  bgcolor: 'main',
                  borderRadius: '32px 32px',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 400,
                }}>Resume </Button>
              <Box sx={{ flex: 1 }}/>
             <SocialLinks />
             
            </Box>
          </Box>
            
          {/* Right Column (scrolls the page) */}
          <Box sx={{
              display: 'flex',
              flexDirection: 'column',
            }}>
          <Box sx={{ flex: 1, p: 2,}}>
            {Array.from({ length: 100 }).map((_, i) => (
              <Typography key={i} >
                Scrollable Item #{i + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Typography>
            ))}
          </Box>
          </Box>
        </Box>





      </ThemeProvider>
    </Container>
    </div>
  );
}