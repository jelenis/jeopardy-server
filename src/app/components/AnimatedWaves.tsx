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
      dur="16s"                   /* 4× longer */
      repeatCount="indefinite"
      calcMode="spline"           /* use bezier splines */
      keyTimes="
        0;
        0.1;
        0.2;
        0.3;
        0.4;
        0.5;
        0.6;
        0.7;
        0.8;
        0.9;
        1
      "
      /* one set of control points per segment, for smooth ease‑in/out */
      keySplines="
        0.42 0 0.58 1;
        0.42 0 0.58 1;
        0.42 0 0.58 1;
        0.42 0 0.58 1;
        0.42 0 0.58 1;
        0.42 0 0.58 1;
        0.42 0 0.58 1;
        0.42 0 0.58 1;
        0.42 0 0.58 1;
        0.42 0 0.58 1
      "
      values="
        M0,40   C240,60  480,0   720,40  C960,80 1200,20 1440,60 L1440,0 L0,0 Z;
        M0,42   C240,58  480,4   720,43  C960,78 1200,18 1440,58 L1440,0 L0,0 Z;
        M0,44   C240,56  480,10  720,46  C960,75 1200,15 1440,55 L1440,0 L0,0 Z;
        M0,46   C240,54  480,14  720,47  C960,73 1200,13 1440,53 L1440,0 L0,0 Z;
        M0,47   C240,53  480,17  720,49  C960,71 1200,11 1440,51 L1440,0 L0,0 Z;
        M0,48   C240,52  480,20  720,50  C960,70 1200,10 1440,50 L1440,0 L0,0 Z;
        M0,47   C240,53  480,17  720,49  C960,71 1200,11 1440,51 L1440,0 L0,0 Z;
        M0,46   C240,54  480,14  720,47  C960,73 1200,13 1440,53 L1440,0 L0,0 Z;
        M0,44   C240,56  480,10  720,46  C960,75 1200,15 1440,55 L1440,0 L0,0 Z;
        M0,42   C240,58  480,5   720,43  C960,78 1200,18 1440,58 L1440,0 L0,0 Z;
        M0,40   C240,60  480,0   720,40  C960,80 1200,20 1440,60 L1440,0 L0,0 Z
      "
    />
  </path>
</svg>
</Box>

  );
}


