import React from 'react';
import Image from "next/image";

export default function ProfileImage() {
  const width = 150;
  const height = width;
  
  return (
    <div 
      className="gradient-blue-teal  circle-reveal animate-shimmer circle reveal-circle animate-ripple"
      style={{ 
        width: width, 
        height: height,
      }}
    >
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
