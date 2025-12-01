import { Box, Typography, Button } from '@mui/material';
import SocialLinks from './SocialLinks';

export default function IntroSection() {


  return (
    <Box
      sx={{
        position: { md: 'static', lg: 'sticky' },
        top: "2.5rem",
        flex: '0 0 auto',
        overflowY: 'auto',
        boxSizing: 'border-box',
        justifyContent: 'center',
        display: { xs: "flex", md: "block" },
        gridColumn: '1',
        flexDirection: { xs: "column" },
        alignItems: { xs: "center" },
      }}
    >
      <Box sx={{
          display: "inline-flex",
          flexDirection: "column",
        }}
      >
        <Box>
          <Typography variant="h3" noWrap fontWeight={100} 
          
          className='color-shift-blue'
          sx={{
            fontFamily: "var(--font-knewave)",
            color: 'primary.main',
            fontSize: { xs: '4rem', sm: '5rem' },
            textAlign: { xs: "center", md: "left" },
            fontWeight: "700",
            letterSpacing: "-0.17rem",
            lineHeight: { xs: '3.8rem', sm: '4.8rem' },
           
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            John <Box component="span">Elenis</Box>
          </Typography>

          <Typography variant='h5' noWrap
            sx={{
              color: 'rgb(0 0 0 / 35%)',
              textAlign: {
                xs: "center", md: "left",
              },
              letterSpacing: '0.25rem',
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.2rem', lg: '1.2rem' }
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
          mt: { xs: 3, md: 2 },
          pb: 2,
        }}>
          <Button
            component="a"
            href="/resume.pdf"
            download="John_Elenis_Resume.pdf"
            variant='contained'
            className="color-shift-blue"
            sx={{
              position: 'relative',
              p: '0.6rem 1.8rem',
              zIndex: 0,
              borderRadius: '32px 32px',
              boxShadow: 'none',
              fontSize: '1rem',
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 600,
              mr: { xs: "15px", md: 0 }
            }}>
            Resume
          </Button>

          <SocialLinks />
        </Box>
      </Box>
    </Box>
  );
}