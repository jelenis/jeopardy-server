'use client';
import React from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AnimatedWaves from './components/AnimatedWaves';

import { Poppins, Montserrat, Lobster, Urbanist } from 'next/font/google'
import SocialLinks from './components/SocialLinks';
import ProfileImage from './components/ProfileImage';
import ProjectSection from './components/ProjectSection';

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
          <Box sx={{
            display: 'flex',
            direction: "row",
            justifyContent: { xs: "center", md: 'left' },
            mb: '1rem',
            ml: { md: "7rem" } // midpoint of John Elenis 
          }}>
            <ProfileImage />
          </Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: { xs: 'column', md: 'row' }
          }
          }>

            {/* Left Column */}
            <Box

              sx={{
                position: { xs: 'static', md: 'sticky' },
                width: { xs: '100%', md: '48%' }, // fill width on small screens, fixed width on larger
                top: "2.5rem",
                flex: '0 0 auto', // no shrink, no grow, fixed width
                overflowY: 'auto',
                boxSizing: 'border-box',
                justifyContent: 'center',
                display: { xs: "flex", md: "block" },
                flexDirection: { xs: "column" },
                alignItems: { xs: "center" },

              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  flexDirection: "column",
                  maxWidth: '100%'
                }}>
                <Box sx={{
           
                }}>

                  <Typography variant="h3" noWrap fontWeight={100} sx={{
                    // textShadow: "2px 2px 0px #00000014", 

                    fontFamily: "var(--font-knewave)",
                    color: 'primary.main',
                    fontSize: { xs: '4rem', sm: '5rem' },
                    textAlign: { xs: "center", md: "left" },
                    fontWeight: "700",
                    letterSpacing: "-0.17rem",
                    // fontStyle: "italic",
                    lineHeight: { xs: '3.8rem', sm: '4.8rem' },
                    backgroundImage: 'url("/gradient.svg")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',

                  }}>

                    John <Box component="span" >Elenis</Box>
                  </Typography>

                  <Typography variant='h5' noWrap
                    sx={{
                      color: 'rgb(0 0 0 / 35%)',
                      textAlign: {
                        xs: "center", md: "left",
                      },
                      letterSpacing: '0.25rem',
                      fontSize: {  xs: '1rem', sm: '1.2rem', md: '1.2rem', lg: '1.2rem'}
                    }}
                  >
                    Junior Software Developer
                  </Typography>

                </Box>
                <Typography variant='h6' noWrap sx={{ whiteSpace: 'normal', color: 'text.secondary', mt: 2, display: { xs: "none", md: "block" } }}>
                  Want to know more? My resume covers <br />
                  my work experience and time in grad school.
                </Typography>

                <Box sx={{
                  display: 'flex',
                  justifyContent: { xs: 'flex-start', md: 'space-between' },
                  alignItems: 'center',
                  mt: {xs: 3, md: 2},
                  pb: 2,
                }}>
                  <Button
                    component="a"
                    href="/resume.pdf"
                    download="John_Elenis_Resume.pdf"
                    variant='contained'
                    sx={{
                      bgcolor: 'primary.main',
                      borderRadius: '32px 32px',
                      fontSize: '1rem',
                      fontFamily: 'var(--font-montserrat)',
                      fontWeight: 400,
                      mr: { xs: "15px", md: 0 }
                    }}>
                    Resume
                    {/* <DownloadIcon sx={{ ml: 1 }} /> */}
                  </Button>

                  <SocialLinks />
                </Box>
              </Box>
            </Box>

            {/* Right Column (scrolls the page) */}
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              width: { xs: "100%", md: "50%" }
            }}>
              <ProjectSection/>
            </Box>
          </Box>
        </ThemeProvider>
      </Container>
    </div>
  );
}