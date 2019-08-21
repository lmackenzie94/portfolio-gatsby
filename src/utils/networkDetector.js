import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from 'react-spring';

function NetworkDetector({
  errorMessage = `Internet connection lost`,
  textColor = `#fff`,
  bgColor = `#000`,
}) {
  const [isDisconnected, setIsDisconnected] = useState(false);
  const webPing = useRef(0);

  useEffect(() => {
    handleConnectionChange();
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);
    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, []);

  const handleConnectionChange = () => {
    const condition = navigator.onLine ? 'online' : 'offline';
    if (condition === 'online') {
      webPing.current = setInterval(() => {
        fetch('//google.com', {
          mode: 'no-cors',
        })
          .then(() => {
            setIsDisconnected(false);
            clearInterval(webPing.current);
          })
          .catch(() => setIsDisconnected(true));
      }, 2000);
      return;
    }
    return setIsDisconnected(true);
  };

  const errorSpring = useSpring({
    opacity: isDisconnected ? 1 : 0,
  });

  const themeStyles = {
    position: `fixed`,
    top: 0,
    left: 0,
    width: `100%`,
    zIndex: 1000,
    textAlign: `center`,
    bg: bgColor,
    color: textColor,
    fontFamily: `inherit`,
    // fontSize:
    padding: `10px 0`,
  };

  return (
    <>
      {isDisconnected && (
        <animated.div sx={{ ...themeStyles }} style={errorSpring}>
          <p>{errorMessage}</p>
        </animated.div>
      )}
    </>
  );
}

export default NetworkDetector;

// TO ADD: use spring transition for mount/unmount animation; add close button; add dropdown for re-connection, make separate component for no theme-ui
// component remains after going 'offline' and making change in code
