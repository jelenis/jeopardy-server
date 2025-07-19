
import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';

interface CategoryProps {
  title: string;
  elevation: number;
}

/**
 * Category component displays a category title inside a styled Paper element.
 *
 * Dynamically scales the font size of the title so that the text fits within its container
 * without breaking words, ensuring optimal readability and appearance across different screen sizes.
 *
 * @param title - The category title to display.
 * @param onClick - Optional click handler for the category.
 * @param elevation - The elevation (shadow depth) for the Paper component.
 */
/**
 * Renders a category card with a dynamically scaled title to fit its container.
 *
 * The `Category` component displays a category title inside a styled Paper element.
 * It automatically scales the text to fit within the available space, adjusting on window resize.
 * 
 * @param {object} props - The component props.
 * @param {string} props.title - The category title to display.
 * @param {function} [props.onClick] - Optional click handler for the category.
 * @param {number} [props.elevation] - The elevation (shadow depth) for the Paper component.
 *
 * @remarks
 * - Uses a `ref` to measure the text size and scales it to fit the parent container.
 * - Listens to window resize events to recalculate scaling.
 */

export default function Category({ title, elevation }: CategoryProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  
 
  // Split the title into lines of max 4 characters each
  // if the word is longer than 4 characters
  const [displayText, setDisplayText] = useState(title.replace(/(\S{4,})(?=\s)/g, '$1\n'));
  const [visible, setVisible] = useState(false);
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

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  

  useEffect(() => {
    const el = textRef.current;
    if (!el || !el.parentElement) return;

    // wait for the next frame so we can get the real size
    // of the text
    requestAnimationFrame(() => {
      
      const parent = el.parentElement;
      if (!parent) return;
      const textWidth = el.scrollWidth;
      const textHeight = el.scrollHeight;
      const parentWidth = parent.offsetWidth;
      const parentHeight = parent.offsetHeight;

      const wScale = (parentWidth / textWidth) * 0.75;
      const hScale = (parentHeight / textHeight) * 0.7;
      

      const rawScale = Math.min(wScale, hScale);

      // Find the bucket whose value is closest to rawScale:
      const SCALE_BUCKETS = [2,4,5,5.5,6,8,10,12,14,15];
      const snapped = SCALE_BUCKETS.reduce((prev, curr) =>
        // choose the bucket that is closest to rawScale
        Math.abs(curr - rawScale) < Math.abs(prev - rawScale) ? curr : prev
      );

      setScale(snapped);
      console.log(`Scaling text: ${title} to ${snapped}, rawScale: ${rawScale}, buckets: ${SCALE_BUCKETS}`);
       // Make visible next frame 
       // (this prevents you seeing it scale)
      requestAnimationFrame(() => {
        setVisible(true);
      });
    });
  }, [ windowSize]);

  return (
    <Paper
      elevation={elevation}
      sx={{
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        overflow: 'hidden',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'primary.main',
        aspectRatio: '1.3 / 1', // Adjust aspect ratio as needed
      }}
    >

        {/* uses this box as a wrapper to 
        scale text evenly and fit the category */}
        <Box 
       
          ref={textRef}
          sx={{
            opacity: visible ? 1 : 0,
            transform: `scale(${scale})`,
            display: 'inline-block',
            width: 'auto',   
            // padding: 1,
          }}
        >
          <Typography
            sx={{
              // fontSize: 'clamp(0.1rem, min(2.8vw, 2.8vh), 1.8vw)',
              fontSize: '0.1em',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              lineHeight: 1.1,
              whiteSpace: "pre-wrap",
              overflowWrap: 'break-word',
            }}
          >
            {displayText}
          </Typography>
        </Box>
    </Paper>
  );
}