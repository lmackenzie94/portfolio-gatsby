import normalizeWheel from 'normalize-wheel';
import { useCallback, useEffect, useRef } from 'react';
import 'utils/scroll/addWheelListener';
import 'utils/scroll/scrollStop';
const polyfill = require('smoothscroll-polyfill');

if (typeof window !== `undefined`) {
  polyfill.polyfill();
}

function useSmoothScroll(ref = null) {
  if (typeof window === `undefined`) {
    return {
      disableScroll: null,
      el: null,
      enableScroll: null,
      stopScroll: null,
    };
  }
  let el = useRef();
  let scrollY = useRef(0);
  let newScrollY = useRef(0);
  let scrollDisabled = useRef(false);

  const handleEnableScroll = () => {
    // console.log('scroll enabled');
    scrollDisabled.current = false;
  };

  const handleDisableScroll = el => {
    // console.log('scroll disabled');
    scrollDisabled.current = true;
  };
  const stopScroll = useCallback(() => {
    newScrollY.current = scrollY.current = el.current.pageYOffset;
  }, []);

  const disableScroll = useCallback(() => handleDisableScroll(), []);
  const enableScroll = useCallback(() => handleEnableScroll(), []);

  const handleWheel = useCallback(e => {
    if (scrollDisabled.current) {
      e.preventDefault();
      return false;
    }
    e.preventDefault();
    const normalized = normalizeWheel(e);
    newScrollY.current = Math.round(
      el.current.pageYOffset + normalized.pixelY * 2.5
    );
    return false;
  }, []);

  const handleAnimationFrame = useCallback(() => {
    if (scrollDisabled.current || newScrollY.current === scrollY.current) {
      scrollY.current = newScrollY.current;
      window.requestAnimationFrame(handleAnimationFrame);
      return;
    }
    scrollY.current += Math.round((newScrollY.current - scrollY.current) / 8);

    if (Math.abs(scrollY.current - newScrollY.current) < 1) {
      scrollY.current = newScrollY.current;
    }
    el.current.scroll({ top: scrollY.current });
    window.requestAnimationFrame(handleAnimationFrame);
  }, []);

  useEffect(() => {
    window.addWheelListener(el.current, handleWheel);
    window.scrollStop(() => {
      newScrollY.current = scrollY.current = window.pageYOffset;
    });
    window.requestAnimationFrame(handleAnimationFrame);

    return () => {
      window.cancelAnimationFrame(handleAnimationFrame);
      window.removeWheelListener(el.current, handleWheel);
    };
  }, [el.current]);

  el.current = ref ? ref.current : window;

  return { disableScroll, el: el.current, enableScroll, stopScroll };
}
export default useSmoothScroll;
