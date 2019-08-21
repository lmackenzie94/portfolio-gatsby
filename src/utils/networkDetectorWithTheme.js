/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState, useEffect, useRef } from 'react';
import { useSpring, useTransition, config, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-solid-svg-icons/faTimes';

function NetworkDetectorWithTheme({
  errorMessage = `Internet connection lost`,
}) {
  const [isDisconnected, setIsDisconnected] = useState(false);
  const [errorIsOpen, setErrorIsOpen] = useState(true);
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

  const errorTransition = useTransition(isDisconnected, null, {
    config: { ...config.gentle, clamp: true },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const errorSpring = useSpring({
    opacity: errorIsOpen ? 1 : 0,
  });

  const themeStyles = {
    position: `fixed`,
    top: 0,
    left: 0,
    width: `100%`,
    zIndex: 1000,
    textAlign: `center`,
    bg: 'primary',
    color: 'text',
    fontFamily: 'body',
    fontSize: [0, 1, 2],
    padding: [2, 3],
  };

  console.log('isDisconnected', isDisconnected);
  console.log('errorIsOpen', errorIsOpen);

  return (
    <>
      {errorTransition.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              sx={{ ...themeStyles }}
              style={
                errorIsOpen
                  ? { opacity: props.opacity, position: `relative` }
                  : { ...errorSpring }
              }
            >
              <p>{errorMessage}</p>
              <button
                onClick={() => setErrorIsOpen(false)}
                sx={{ fontSize: [2, 3] }}
                style={{
                  background: `none`,
                  outline: `none`,
                  border: `none`,
                  cursor: `pointer`,
                  position: `absolute`,
                  top: `0px`,
                  right: `10px`,
                  height: `100%`,
                  width: `40px`,
                  display: `flex`,
                  alignItems: `center`,
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </animated.div>
          )
      )}
    </>
  );
}

export default NetworkDetectorWithTheme;

// TO ADD: add dropdown for re-connection
// component remains after going 'offline' and making change in code or refreshing the page
