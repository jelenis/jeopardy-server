
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { text } from 'stream/consumers';

interface CategoryProps {
  title: string;
}

export default function Category({ title, onClick }: CategoryProps) {
  const textRef = useRef();
  const [scale, setScale] = useState(1);
  const [displayText, setDisplayText] = useState(title);
  const MIN_SCALE = 0.7; // minimum scale factor
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;


    // use dynamic scaling based on parent width
    // and text width to ensure text fits within the card
    const parentWidth = el.parentElement.offsetWidth;
    const textWidth = el.scrollWidth;
   

    // If text width exceeds parent width, scale down
    // to fit within the card, but don't scale smaller than 70%
    if (textWidth > parentWidth) {
      console.log(`Scaling text: "${title}" from ${textWidth} to ${parentWidth}`);
      const newScale = parentWidth / textWidth * 0.9; // scale to 90% of parent width
      setScale(Math.max(newScale, MIN_SCALE)); // ensure we don't scale down too much
      console.log(`New scale: ${newScale}`);

      // force break if text is too long
      if (newScale < MIN_SCALE) {
        const mid = Math.floor(title.length / 2);
        const firstPart = title.slice(0, mid);
        const secondPart = title.slice(mid);
        setDisplayText(`${firstPart}\n${secondPart}`);
      }
    }  else   {
      setScale(1);
      setDisplayText(title); // reset to original title if no scaling needed
    }


  }, [title]);

  return (
    <Card elevation={8} sx={{
      onClick: {onClick},
      width: {
        xs: 50, // extra small screens
        sm: 100,  // small screens
        md: 140,  // medium+
        lg: 225,  // medium+
      },
      height: {
        xs: 50, // extra small screens
        sm: 100,
        md: 140,
        lg: 225,  // medium+
      },
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'primary.main', // dark indigo or any color
      flexDirection: 'column', // makes vertical stacking natural for text
      textAlign: 'center',
    }}>
     
        <Typography gutterBottom ref={textRef} sx={{
      
          m: 0, // removes all margin
          color: 'white', 
          fontSize: {
            xs: '0.5rem',
            sm: '1rem',
            md: '1.5rem',
            lg: '2.25rem',
          },
          fontWeight: 'bold', 
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
          textAlign: 'center',
          justifyContent: 'center',

          transform: `scale(${scale})`, // apply scaling (has to be in  string format)
        }}>
          {displayText}
        </Typography>
        <Typography variant="h5" component="div">

        </Typography>

      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}