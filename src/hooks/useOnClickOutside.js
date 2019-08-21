import { useEffect } from 'react';
function useOnClickOutside(ref, ignoreRef, handler) {
  useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (
        !ref.current ||
        ref.current.contains(event.target) ||
        (ignoreRef.current && ignoreRef.current.contains(event.target))
      ) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, ignoreRef, handler]);
}

export default useOnClickOutside;
