'use client';
import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Button, Divider } from '@mui/material';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import AnimatedWaves from './components/AnimatedWaves';

import { Poppins, Montserrat, Dancing_Script, Lobster, Knewave } from 'next/font/google'
import SocialLinks from './components/SocialLinks';
import DownloadIcon from '@mui/icons-material/Download';
import ProfileImage from './components/ProfileImage';
import ContentList from './components/ContentList';
import ContentHeader from './components/ContentHeader';

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
                // mr: { xs: 0, md: 2 },

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
                  color: 'main',
                  fontSize: {xs: '3.2rem', sm:'4rem'}
                }}>
                  John <Box component="span" sx={{}}>Elenis</Box>
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
                  <Button variant='contained'
                    sx={{
                      bgcolor: 'main',
                      borderRadius: '32px 32px',
                      fontSize: '1rem',
                      fontFamily: 'var(--font-montserrat)',
                      fontWeight: 400,
                      mr: { xs: "15px", md: 0 }
                    }}>Resume </Button>

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
             <ContentHeader sx={{mt: 5}}>About Me</ContentHeader>
            <Typography sx={{ color: "text.secondary",  mb: 2, fontWeight: 100}}>
              I’m a Systems Engineering
              graduate with hands‑on experience in both <Box component={"span"} sx={{color: "main", fontWeight:600}}>full-stack development </Box> 
              and <Box component={"span"} sx={{color: "main", fontWeight:600}}>embedded systems</Box>.
              After stepping away for a bit, I’m now eager to jump back into the tech world and put my skills to work.
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 3,  fontWeight: 100}}>
              Check out some of my personal projects below. You can also find more on my GitHub or connect with me on LinkedIn!
            </Typography>
              <ContentHeader>Projects</ContentHeader>
                <ContentList projects={[
                  {
                    title: 'Jeopardy Simulator',
                    description: `An interactive Jeopardy! web app built with React, Next.js, and 
                    Material UI. It leverages the jeopardy‑json npm package 
                    to pull real show data—categories, clues, and answers for an authentic game‑show experience.`,
                    thumbnail: '/images/jeopardy.png',
                  }, 
                  {
                    title: 'jeopardy-json',
                    description: `A lightweight Node.js package that fetches and converts Jeopardy! game data from the J! Archive into structured, readable JSON`,
                    thumbnail: '/images/jeopardy-json.png',
                  }, 
                  {
                    title: 'login-manager',
                    description: `Easily design your own Linux greeter without having to worry about the implementation.
                                  An event based interface for creating fully customizable Linux login themes using Lightdm's Webkit2 Greeter.`,
                    thumbnail: '/images/example.gif',
                  },   
                ]}></ContentList>
              <ContentHeader>Capstone 2019</ContentHeader>
              <ContentList projects={[
                  {
                    title: 'Low Power Keyword Spotting',
                    description: 'Personal site built with Next.js & Material UI to showcase projects and blog posts.',
                    thumbnail: '/images/lpk.png',
                  },
                ]}></ContentList>
            </Box>
          </Box>





        </ThemeProvider>
      </Container>
    </div>
  );
}