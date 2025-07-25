
import React from 'react';
import { Box, CardMedia, Card, CardContent, Typography,  CardActionArea,  } from '@mui/material';
import NextLink from 'next/link';


interface Project {
  thumbnail: string;
  title: string;
  description: string;
  href?: string;
}

interface ContentListProps {
  projects: Project[];
}

export default function ContentList({ projects }: ContentListProps) {
  return (<Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 5,             // space between cards
      '& > :last-child': {
        mb: 2,           // theme.spacing(2) → 16px
      },
    }}
  >
    {projects.map((p, i) => (
      <Box key={i} sx={{ 
        display: "flex",
        alignContent: "center",
        justifyContent: "center"}}>
        <Card sx={{
          
          maxWidth: { xs: "80%", md: "95%" },
          transition: 'box-shadow 0.2s ease-in-out',
          boxShadow: '0',        // disable box-shadow normally
          '&:hover': {
            boxShadow: 4,      // elevated on hover
          },
          borderRadius: "10px 10px",
          border: "1px solid rgba(0,0,0,0.1)"
        }}>
          <CardActionArea component="a" href={p.href} >
            <CardMedia
              sx={{ height: 140 }}
              image={p.thumbnail}
              title=""
            />
            <CardContent sx={{ borderTop: "1px solid rgba(0, 0, 0, 0.2)", }}>
              <Typography gutterBottom variant="h5" component="div">
                {p.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {p.description}
              </Typography>
            </CardContent>
          </CardActionArea>
         
        </Card>
      </Box>
    ))}
  </Box>
  );
}