
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
export default function Category({ title, onClick, elevation }: CategoryProps) {
  const textRef = useRef();

  const [scale, setScale] = useState(1);
  const [displayText, setDisplayText] = useState(title);
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

      // el.style.visibility = 'hidden'; // Not display: none so we can measure it

    // wait for the next frame so we can get the real size
    // of the text
    requestAnimationFrame(() => {
      const parent = el.parentElement;
      const textWidth = el.scrollWidth;
      const textHeight = el.scrollHeight;
      const parentWidth = parent.offsetWidth;
      const parentHeight = parent.offsetHeight;

      const wScale = (parentWidth / textWidth) * 0.95;
      const hScale = (parentHeight / textHeight) * 0.95;
      const newScale = Math.min(wScale, hScale, 1);

      setScale(newScale);
       // Make visible next frame 
       // (this prevents you seeing it scale)
      requestAnimationFrame(() => {
        setVisible(true);
      });
    });
  }, [displayText, windowSize]);

  return (
    <Paper
      elevation={elevation}
      sx={{
        aspectRatio: '1.3 / 1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'primary.main',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
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
            padding: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              lineHeight: 1.1,
              whiteSpace: 'normal',
              wordBreak: 'keep-all',
              overflowWrap: 'normal',
            }}
          >
            {displayText}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}