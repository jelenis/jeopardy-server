'use client';
import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Button, Link } from '@mui/material';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import AnimatedWaves from './components/AnimatedWaves';

import { Poppins, Montserrat, Dancing_Script, Lobster, Knewave } from 'next/font/google'
import SocialLinks from './components/SocialLinks';
import ProfileImage from './components/ProfileImage';
import ContentList from './components/ContentList';
import ContentHeader from './components/ContentHeader';
import NextLink from 'next/link';

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

const knewave = Knewave({
  subsets: ['latin'],
  weight: ['400',],
  display: 'swap',
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
    h5: { fontSize: "1.5rem", fontFamily: 'var(--font-montserrat)', fontWeight: 300 },
    h6: { fontSize: "1.1rem", fontFamily: 'var(--font-montserrat)' }
  },
})


// Highlight component for emphasizing text with primary color and bold font
const Highlight = ({ children }: 
  { children: React.ReactNode }) => (
  <Typography sx={{ color: "primary.main", fontWeight: 600 }} component="span">
    {children}
  </Typography>
);


export default function Page() {
  return (
    <div>

      <AnimatedWaves />

      <Container className={`${poppins.variable} ${montserrat.variable} ${knewave.variable} ${lobster.variable}`} >
        <ThemeProvider theme={theme}>
       <Box sx={{
          display: 'flex',
          direction: "row",
          justifyContent: 'center',
          width: {xs: "auto", md:'29%'},
          ml: 2}}>
        <ProfileImage/>
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
                flexDirection: "column",}}>
                <Typography  variant="h3" noWrap fontWeight={100} sx={{
                  // textShadow: "2px 2px 0px #00000014", 
                  pl: 1,
                  fontFamily: "var(--font-knewave)",
                  color: 'primary.main',
                  fontSize: {xs: '3.2rem', sm:'4rem'}
                }}>
                  John <Box component="span" >Elenis</Box>
                </Typography>

                <Typography variant='h5' noWrap sx={{ color: 'text.secondary' }}>
                  Junior Software Developer
                </Typography>

                <Typography variant='h6' noWrap sx={{ color: 'text.secondary', mt: 2, display: {xs: "none", md: "block"}}}>
                  Want to know more? My resume covers <br />
                  my work experience  and time in grad school.
                </Typography>

                <Box sx={{
                  display: 'flex',
                  justifyContent: { xs: 'flex-start', md: 'space-between' },
                  alignItems: 'center',
                  mt: 2,
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
              {/* <ContentHeader>About</ContentHeader> */}
             <ContentHeader >About Me</ContentHeader>
            <Typography sx={{ color: "text.secondary",  mb: 2, fontWeight: 100}}>
              I’m a Systems Engineering
              graduate with hands‑on experience in both <Highlight>full-stack development </Highlight> 
              and <Highlight >embedded systems</Highlight>.
              After stepping away for a bit, I’m now eager to jump back into the tech world and put my skills to work.
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 3,  fontWeight: 100}}>
              Check out some of my personal projects below. You can also find more on my {' '}
              <Link component={NextLink} href="https://github.com/jelenis">GitHub</Link>
               {' '}or connect with me on <Link component={NextLink} href="https://www.linkedin.com/in/john-anthony-elenis"> LinkedIn</Link>!
            </Typography>
              <ContentHeader>Projects</ContentHeader>
                <ContentList projects={[
                  {
                    title: 'Jeopardy Simulator',
                    description: `An interactive Jeopardy! web app built with React, Next.js, and 
                    Material UI. It leverages jeopardy-json
                    to pull real categories, clues, and answers for an authentic game-show experience.`,
                    thumbnail: '/images/jeopardy2.png',
                    href: "/jeopardy"
                  }, 
                  {
                    title: 'jeopardy-json',
                    description: `A lightweight Node.js package that fetches and converts Jeopardy! game data from the J! Archive into structured, readable JSON`,
                    thumbnail: '/images/jeopardy-json.png',
                    href: "https://github.com/jelenis/jeopardy-json/tree/main"
                  }, 
                  {
                    title: 'login-manager',
                    description: `Easily design your own Linux greeter without having to worry about the implementation.
                                  An event based interface for creating fully customizable Linux login themes using Lightdm's Webkit2 Greeter.`,
                    thumbnail: '/images/example.gif',
                    href: "https://github.com/jelenis/login-manager"
                  },   
                ]}></ContentList>
              <ContentHeader>Capstone 2019</ContentHeader>
              <ContentList projects={[
                  {
                    title: 'Low Power Keyword Spotting',
                    description: 'Personal site built with Next.js & Material UI to showcase projects and blog posts.',
                    thumbnail: '/images/lpk.gif',
                    href: "https://ieeexplore.ieee.org/document/9255693"
                  },
                ]}></ContentList>
            </Box>
          </Box>
        </ThemeProvider>
      </Container>
    </div>
  );
}