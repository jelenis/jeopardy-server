import React from 'react';
import Image from "next/image";

export default function ProfileImage() {
  const width = 150;
  const height = width;
  
  return (
    <div 
      className="gradient-blue-teal  circle-reveal animate-shimmer circle"
      style={{ 
        width: width, 
        height: height,
      }}
    >
        <div className="ripple"></div>
        <div className="ripple-2"></div>
      <Image
        src="/images/me2.png"
        alt="Profile"
        width={width}
        height={height}
        style={{
          objectFit: 'cover',
        }}
        className="circle"
      />
    </div>
  );
}
