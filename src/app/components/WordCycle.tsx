'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const words = ['Developer', 'Engineer', 'Problem Solver', 'Creator'];

export default function WordCycle() {
  const [index, setIndex] = useState(0);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const grow = setTimeout(() => setScale(1), 50);       // Start growing
    const shrink = setTimeout(() => setScale(0), 2200);   // Start shrinking
    const next = setTimeout(() => setIndex((i) => (i + 1) % words.length), 2500); // Swap after shrink

    return () => {
      clearTimeout(grow);
      clearTimeout(shrink);
      clearTimeout(next);
    };
  }, [index]);

  return (
    <Box
      sx={{
        height: '3rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          transform: `scale(${scale})`,
          transition: 'transform 0.6s cubic-bezier(0.3, 0.8, 0.4, 1.2)',
          transformOrigin: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        {words[index]}
      </Typography>
    </Box>
  );
}
