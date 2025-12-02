import Image from "next/image";
import React from "react";
import { useRandomInterval } from "../hooks/useRandomInterval";

export default function ProfileImage() {
  const width = 150;
  const height = width;
  const [rippleKey, setRippleKey] = React.useState(0);

  const triggerRipple = React.useCallback(() => {
    // Set random delay
    const randomDelay = Math.random() * 2;
    document.documentElement.style.setProperty('--ripple-delay', randomDelay + 's');
    
    // Force re-render to restart CSS animation
    setRippleKey(prev => prev + 1);
  }, []);

  useRandomInterval({
    callback: triggerRipple,
    minDelay: 2,  // 2 seconds minimum
    maxDelay: 5   // 5 seconds maximum  
  });
  return (
    <div 
      className="gradient-blue-teal  circle-reveal animate-shimmer circle"
      style={{ 
        width: width, 
        height: height,
      }}
    >
   
      
      <div key={rippleKey} className="ripple"></div>
      <div key={rippleKey + 0.1} className="ripple-2"></div>
  
    
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
