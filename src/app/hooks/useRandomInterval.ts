import { useEffect } from 'react';

interface UseRandomIntervalOptions {
  callback: () => void;
  minDelay: number;
  maxDelay: number;
  initialDelay?: number;
}


/**
 * 
 * Calls the provided callback at random intervals between minDelay and maxDelay seconds.
 * An optional initialDelay can be provided to delay the start of the first callback.
 */
export function useRandomInterval({ 
  callback, 
  minDelay, 
  maxDelay, 
  initialDelay = 0 
}: UseRandomIntervalOptions) {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    
    const scheduleNext = () => {
      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      timeoutId = setTimeout(() => {
        callback();
        scheduleNext(); // Schedule the next call
      }, randomDelay * 1000);
    };

    // Start after initial delay
    timeoutId = setTimeout(scheduleNext, initialDelay * 1000);
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [callback, minDelay, maxDelay, initialDelay]);
}