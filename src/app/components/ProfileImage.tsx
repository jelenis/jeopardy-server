import Image from "next/image";
import React from "react";
import { useRandomInterval } from "../hooks/useRandomInterval";

export default function ProfileImage() {
  const width = 150;
  const height = width;
  const [rippleKey, setRippleKey] = React.useState(0);
  const [showRipple, setShowRipple] = React.useState(false);
  const triggerRipple = React.useCallback(() => {
    // Set random delay
    const randomDelay = Math.random() * 2;
    document.documentElement.style.setProperty('--ripple-delay', randomDelay + 's');
    
    // Force re-render to restart CSS animation
    setRippleKey(prev => prev + 1);
  }, []);

  useRandomInterval({
    callback: triggerRipple,
    minDelay: 2,
    maxDelay: 5,
  });

  // Show ripples after a short delay instead of waiting for image load
  React.useEffect(() => {
    const timer = setTimeout(() => setShowRipple(true), 300);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div 
      className="gradient-blue-teal  circle-reveal animate-shimmer circle"
      style={{ 
        width: width, 
        height: height,
      }}
    >
   
      
      {showRipple && (
        <>
          <div key={rippleKey} className="ripple"></div>
          <div key={rippleKey + 0.1} className="ripple-2"></div>
        </>
      )}
  
      <Image
        src="/images/me2.webp"
        alt="Profile"
        width={width}
        height={height}
        priority
        style={{
          objectFit: 'cover',
        }}
        className="circle"
        onLoad={() => {
          setShowRipple(true);
        }}
      />
    </div>
  );
}
