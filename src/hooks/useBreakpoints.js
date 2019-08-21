import { useState, useLayoutEffect, useEffect } from 'react';
import mitt from 'mitt';
import defaultTheme from 'theme';

const BREAKPOINTS = defaultTheme.breakpoints.map(bp => parseInt(bp));

function getBreakpoint() {
  for (let n = 0; n < BREAKPOINTS.length; n++) {
    if (BREAKPOINTS[n] > window.innerWidth) {
      return n;
    }
  }
  return BREAKPOINTS.length - 1;
}

function useBreakpoints(mobileSize = 1, breakpointChangeHandler = null) {
  useBreakpoints.__init();

  const initialBreakpoint = typeof window === `undefined` ? 0 : getBreakpoint();
  const [bp, setBp] = useState(initialBreakpoint);
  const [isMobile, setIsMobile] = useState(initialBreakpoint <= mobileSize);

  useEffect(() => {
    // console.log('bp changed', bp);
    setIsMobile(bp <= mobileSize);
    if (breakpointChangeHandler) {
      breakpointChangeHandler.call(null, bp);
    }
  }, [bp]);

  const handleResize = () => {
    const newSize = getBreakpoint();
    // console.log(`handleRs`, 'bp', bp, `new`, newSize);
    if (newSize !== bp) {
      // console.log('setting new size', newSize);
      setBp(newSize);
    }
  };

  useLayoutEffect(() => {
    useBreakpoints.__emitter.on('resize', handleResize);
    setTimeout(() => {
      handleResize();
    }, 1);
    return () => {
      useBreakpoints.__emitter.off('resize', handleResize);
    };
  }, []);

  return [isMobile, bp];
}

useBreakpoints.__init = function() {
  if (useBreakpoints.__initted) {
    return;
  }
  useBreakpoints.__initted = true;

  if (typeof window === `undefined`) {
    return false;
  }

  useBreakpoints.__emitter = mitt();
  // Store the window width
  useBreakpoints.__actualWidth = window.innerWidth;

  // Resize Event
  window.addEventListener('resize', () => {
    if (window.innerWidth !== useBreakpoints.__actualWidth) {
      useBreakpoints.__actualWidth = window.innerWidth;
      useBreakpoints.__emitter.emit(`resize`, {
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  });
};

export default useBreakpoints;
