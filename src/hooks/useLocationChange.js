import { useRef, useEffect } from 'react';
import normalizePathname from 'utils/normalizePathname';

function useLocationChange(location, updateFunc = null) {
  const normalizedPathname = normalizePathname(location.pathname);
  const locationKey = useRef(normalizedPathname);

  useEffect(() => {
    if (normalizedPathname !== locationKey.current) {
      locationKey.current = normalizedPathname;
      if (updateFunc) updateFunc(locationKey.current);
    }
  }, [location]);

  return locationKey.current;
}

export default useLocationChange;
