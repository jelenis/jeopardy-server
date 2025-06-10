
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
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    }

    window.addEventListener('resize',  handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);



  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    // Remove any line breaks from displayText
    // this might be added previously if rescaled
    let cleanTitle = displayText.replace(/\n+/g, '');

    // // we have to render the text first to get its dimensions
    if (cleanTitle !== displayText) {
      console.log(`Updating displayText from "${displayText}" to "${cleanTitle}"`);
      setDisplayText(cleanTitle);
      setScale(1);
      return; // wait for next render
    }

    const parentWidth = el.parentElement.offsetWidth;
    const parentHeight = el.parentElement.offsetHeight;
    const textWidth = el.scrollWidth;
    const textHeight = el.scrollHeight;
    title = displayText; // use the current displayText for calculations
    

    const wScale = parentWidth / textWidth * 0.85;
    const hScale = parentHeight / textHeight * 0.9;
    const newScale = Math.min(wScale, hScale);

    if (textHeight >= parentHeight * 0.8) { // allow some padding  
      setScale(newScale); 
    } 
    else if (textWidth >= parentWidth * 0.85) { // allow some padding
      setScale(newScale); // ensure we don't scale down too much

    } 

  
    

  }, [title, windowSize]);

  return (
    <Card elevation={8} 
    sx={{
      onClick: {onClick},

      aspectRatio: '1.3 / 1',  
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
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}