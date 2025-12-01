import { time } from "console";
import Image from "next/image";
import React from "react";



export default function ProfileImage() {
  const width = 150;
  const height = width;
  const [rippleKey, setRippleKey] = React.useState(0);
 
  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    const rippleDuration = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ripple-duration'));
    
    const triggerRipple = () => {
      // Set random delay and trigger new ripple
      const randomDelay = Math.random() * 2;

      // update the CSS
      document.documentElement.style.setProperty('--ripple-delay', randomDelay + 's');

      // force re-render to restart CSS animation
      setRippleKey(prev => prev + 1);
      
      // schedule next ripple after animation completes
      timeoutId = setTimeout(triggerRipple, rippleDuration * 1000 + (randomDelay * 1000));
    };

    // Start the cycle
    triggerRipple(); 
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);
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
