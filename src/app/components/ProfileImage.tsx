import React from 'react';
import Image from "next/image"
export default function ProfileImage() {

  const width = 150;
  const height = width;
  return (
    <div style={{ 
      width: width, 
      height: height,
      background: 'linear-gradient(135deg, rgba(119, 203, 224, 1) 0%, rgba(94, 199, 234, 1) 50%, rgb(91, 255, 234) 100%)',
      clipPath: 'circle(50% at 50% 50%)',
      }}>
      <Image
        src="/images/me2.png"
        alt="Profile"
        width={width}
        height={height}
        
        
        
        style={{
          objectFit: 'cover',
          clipPath: 'circle(50% at 50% 50%)',
          // border: '2px solid #cf6788',
        }}
      />
    </div>
  );
}
