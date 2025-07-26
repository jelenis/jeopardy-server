
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
  


  const [visible, setVisible] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  // if the word is longer than 3 characters replace space with newline

let displayText = title.replace(/(\S{1,})\s+/g, '$1\n');
const split = displayText.split("\n");


  let res: string[][] = [];
  const dfs = function(idx: number, path: string[]) {
    if (idx == split.length) {
      res.push(path.slice());
      return;
    }
      path.push(split[idx]);
      dfs(idx + 1, path);
      path.pop();

    if (path.length > 0 && path[path.length -1].length + split[idx].length < 8) {
      path[path.length - 1] += " " + split[idx];
      dfs(idx + 1, path)
    }
    
  }

  dfs(0,[]);
  let best = Infinity;
  let bestValue = res[0];
  // determine which block of text has the smallest area
  for (let i=0; i < res.length; i++) {
    const maxLine = Math.max(...res[i].map(x => x.length));
    let squarness = res[i].length * maxLine;
    if ( squarness < best) {
      best = squarness;
      bestValue = res[i]
     
    }
  }
  displayText = bestValue.join("\n")



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
    setScale(1);
    setVisible(false);
  }, [title]);

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
      const hScale = (parentHeight / textHeight) * 0.75;

      const rawScale = Math.min(wScale, hScale, 25);
      
      setScale(Math.round(rawScale * 10) / 10);

       // Make visible next frame 
       // (this prevents you seeing it scale)
      requestAnimationFrame(() => {
        setVisible(true);
      });
    });
  }, [ windowSize, displayText]);

 

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
        aspectRatio: '1.3 / 1', 
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
            
          }}
        >
          <Typography
            sx={{
              fontSize: '0.1rem',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              lineHeight: `normal`,
              mb: "1px"
            }}
          >
          {displayText.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              <span style={{display: "block"}}>
                {line}
              </span>
            </React.Fragment>
          ))}
          </Typography>
        </Box>
    </Paper>
  );
}