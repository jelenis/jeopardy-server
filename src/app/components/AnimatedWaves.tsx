import React from 'react';
import { Box } from '@mui/material';
// import './AnimatedWaves.css';

export default function AnimatedWaves() {
  return (
<Box sx={{ width: '100%', overflow: 'hidden', lineHeight: 0, opacity: 1 }}>
<svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
  <path
    fill="#219ebc"
    d="M0,0 C240,60 480,0 720,40 C960,80 1200,20 1440,60 L1440,0 L0,0 Z"
  >
    <animate
      attributeName="d"
      dur="10s"
      repeatCount="indefinite"
      values="
              M0,40 C240,60 480,0 720,40 C960,80 1200,20 1440,60 L1440,0 L0,0 Z;
              M0,42 C240,58 480,5 720,43 C960,78 1200,18 1440,58 L1440,0 L0,0 Z;
              M0,44 C240,56 480,10 720,46 C960,76 1200,16 1440,56 L1440,0 L0,0 Z;
              M0,42 C240,58 480,5 720,43 C960,78 1200,18 1440,58 L1440,0 L0,0 Z;
              M0,40 C240,60 480,0 720,40 C960,80 1200,20 1440,60 L1440,0 L0,0 Z
      "
    />
  </path>
</svg>
</Box>

  );
}

