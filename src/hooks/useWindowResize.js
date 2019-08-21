import mitt from 'mitt';
import { useState, useEffect, useCallback } from 'react';

function useWindowResize(callback) {
  useWindowResize.__init();
  const [size, setSize] = useState(
    typeof window === `undefined`
      ? { width: 0, height: 0, documentHeight: 0 }
      : {
          width: window.innerWidth,
          height: window.innerHeight,
          documentHeight:
            Math.max(
              useWindowResize.__body.scrollHeight,
              useWindowResize.__body.offsetHeight,
              useWindowResize.__html.clientHeight,
              useWindowResize.__html.scrollHeight,
              useWindowResize.__html.offsetHeight
            ) + 100,
        }
  );

  const handleResize = useCallback(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
      documentHeight:
        Math.max(
          useWindowResize.__body.scrollHeight,
          useWindowResize.__body.offsetHeight,
          useWindowResize.__html.clientHeight,
          useWindowResize.__html.scrollHeight,
          useWindowResize.__html.offsetHeight
        ) + 100,
    });
    if (callback) callback.call(null, size);
  }, []);

  useEffect(() => {
    useWindowResize.__emitter.on(`resize`, handleResize);
    handleResize();
    return () => {
      useWindowResize.__emitter.off(`resize`, handleResize);
    };
  }, []);

  return size;
}

useWindowResize.__init = function() {
  if (useWindowResize.__initted) {
    return;
  }
  useWindowResize.__initted = true;

  if (typeof window === `undefined`) {
    return false;
  }

  useWindowResize.__emitter = mitt();
  // Store the window width
  useWindowResize.__actualWidth = window.innerWidth;
  useWindowResize.__body = document.body;
  useWindowResize.__html = document.documentElement;

  // Resize Event
  window.addEventListener('resize', () => {
    if (window.innerWidth !== useWindowResize.__actualWidth) {
      useWindowResize.__actualWidth = window.innerWidth;
      useWindowResize.__emitter.emit(`resize`, {
        width: window.innerWidth,
        height: window.innerHeight,
        documentHeight:
          Math.max(
            useWindowResize.__body.scrollHeight,
            useWindowResize.__body.offsetHeight,
            useWindowResize.__html.clientHeight,
            useWindowResize.__html.scrollHeight,
            useWindowResize.__html.offsetHeight
          ) + 100,
      });
    }
  });
};

export default useWindowResize;
