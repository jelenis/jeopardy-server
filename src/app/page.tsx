'use client';

import React from 'react';
import { Container, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AnimatedWaves from './components/AnimatedWaves';
import { NoSsr } from '@mui/material';

import { Poppins, Montserrat, Lobster, Urbanist } from 'next/font/google'
import SocialLinks from './components/SocialLinks';
import ProfileImage from './components/ProfileImage';
import ProjectSection from './components/ProjectSection';
import IntroSection from './components/IntroSection';

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

const knewave = Urbanist({
  subsets: ["latin"],
  weight: [
    "100", "200", "300", "400", "500", "600", "700", "800", "900"
  ],
  style: ["normal", "italic"],
  display: "swap",
  variable: '--font-knewave',
});

const lobster = Lobster({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-lobster',
});


const theme = createTheme({
  palette: {
    primary: {
      main: "#219ebc",
      light: '#8ecae6',
      dark: '#273F4F',
    },
    secondary: {
      main: '#ffb703',
      light: "#BF80FF",
    },
    background: {
      default: "#fbfbfb",
    },
  },
  typography: {
    fontFamily: 'var(--font-poppins), var(--font-montserrat), sans-serif',

    h4: { fontSize: "3rem", fontFamily: 'var(--font-poppins)', fontWeight: 600 },
    h5: { fontFamily: 'var(--font-montserrat)', fontWeight: 500 },
    h6: { fontSize: "1.1rem", fontFamily: 'var(--font-montserrat)' }
  },
})

export default function Page() {
  return (
    <div>

      <AnimatedWaves />

      <Container className={`${poppins.variable} ${montserrat.variable} ${knewave.variable} ${lobster.variable}`} >
        <ThemeProvider theme={theme}>
          <Box 
            suppressHydrationWarning
            sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr',  lg: 'auto 1fr' },
            columnGap: '5rem',
            gridTemplateRows: 'auto',
            justifyItems: 'center',
            alignItems: 'start',
           
          }}>

            {/* Profile Image */}
               <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                mb: '0.25rem',
                mr: { xs: 0, md: 4 }
              }}>
                <ProfileImage />
              </Box>

            {/* Intro Description */}
            <IntroSection />

            {/* Projects column */}
            <Box sx={{
              gridColumn: { xs: '1', lg: '2' },
              display: 'flex',
              flexDirection: 'column',
            }}>
              <ProjectSection />
            </Box>
          </Box>
        </ThemeProvider>
      </Container>
    </div>
  );
}