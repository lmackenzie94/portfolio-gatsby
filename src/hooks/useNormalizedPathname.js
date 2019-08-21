import { useState, useEffect } from 'react';
import normalizePathname from 'utils/normalizePathname';

function useNormalizedPathname(location) {
  const [normalizedPathname, setNormalizedPathname] = useState(
    normalizePathname(location.pathname)
  );
  useEffect(() => {
    setNormalizedPathname(normalizePathname(location.pathname));
  }, [location.pathname]);

  return normalizedPathname;
}

export default useNormalizedPathname;
