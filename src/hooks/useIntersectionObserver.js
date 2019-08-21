import { useEffect, useState } from 'react';

function useIntersectionObserver(
  ref,
  options = {
    threshold: 0,
    root: null,
    rootMargin: `-25% 0% -25% 0%`,
    triggerOnce: false,
  },
  debug = false
) {
  let observer;
  // configure the state
  const [state, setState] = useState({
    inView: false,
    triggered: false,
    entry: undefined,
  });
  if (!options)
    options = {
      threshold: 0,
      root: null,
      rootMargin: `-25% 0% -25% 0%`,
      triggerOnce: false,
    };
  const { threshold, root, rootMargin, triggerOnce } = options;

  useEffect(() => {
    // check that the element exists, and has not already been triggered
    if (ref.current && !state.triggered) {
      observer = new IntersectionObserver(
        (entries, observerInstance) => {
          // checks to see if the element is intersecting
          entries.forEach(entry => {
            if (triggerOnce && state.triggered) {
              return;
            }
            if (entry.intersectionRatio > 0) {
              if (debug) {
                console.log(entry);
              }
              // if it is update the state, we set triggered as to not re-observe the element
              setState({
                inView: true,
                triggered: true,
                entry: observerInstance,
              });
              if (triggerOnce) {
                observerInstance.unobserve(ref.current);
                observer.disconnect();
              }
            } else {
              if (triggerOnce) {
                return;
              }
              setState({
                inView: false,
                triggered: true,
                entry: observerInstance,
              });
            }
          });
        },
        {
          threshold: threshold || 0,
          root: root || null,
          rootMargin: rootMargin || '0%',
        }
      );
      observer.observe(ref.current);
    }
    return () => {
      if (observer && state.triggerOnce && state.triggered) {
        observer.disconnect();
      }
    };
  }, [ref.current, rootMargin, triggerOnce, threshold, state.triggered]);
  useEffect(() => {
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return [state.inView, state.entry];
}

export default useIntersectionObserver;
