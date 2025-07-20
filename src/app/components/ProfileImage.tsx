import React from 'react';

export default function WavyProfileImage() {
  return (
    <div style={{ width: 120, height: 120 }}>


      <img
        src="/images/me.png"
        alt="Profile"
        style={{
          width: 120,
          height: 120,
          objectFit: 'cover',
          clipPath: 'circle(50% at 50% 50%)',
          // border: '2px solid #cf6788',
        }}
      />
    </div>
  );
}
