
import React from 'react';
import {Box, CardMedia, Card, CardContent, Typography, CardActions, Button, CardActionArea, Divider} from '@mui/material';



interface Project {
  thumbnail: string;
  title: string;
  description: string;
}

interface ContentListProps {
  projects: Project[];
}

export default function ContentList({projects}: ContentListProps) {
return (<Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 2,             // space between cards
      '& > :last-child': {
      mb: 2,           // theme.spacing(2) → 16px
    },
  }}
>    
  {projects.map((p,i) => (
    <Box key={i}>
    <Card  sx={{ 
      maxWidth: {xs:"100%", md:"80%"},
      ml: {xs: 0, md:"5%"},
      boxShadow: "none",
      borderRadius: "15px 15px",
      border: "1px solid rgba(0,0,0,0.1)"
       }}>
        <CardActionArea>
        <CardMedia
          sx={{ height: 140 }}
          image={p.thumbnail}
          title=""
        />
        <CardContent sx={{borderTop: "1px solid rgba(0, 0, 0, 0.2)",}}>
          <Typography gutterBottom variant="h5" component="div">
            {p.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {p.description}
          </Typography>
        </CardContent>
        </CardActionArea>
      </Card>
 {/* {i < projects.length - 1 && (
      <Divider sx={{ my: 2 }} />
    )} */}

    </Box>
   


  ))}
</Box>
);}