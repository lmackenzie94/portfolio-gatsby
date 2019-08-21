import { useState, useEffect } from 'react';
import normalizePathname from 'utils/normalizePathname';

function useBasePath(location) {
  const [basePath, setBasePath] = useState(
    normalizePathname(location.pathname).split('/')[0]
  );
  useEffect(() => {
    setBasePath(normalizePathname(location.pathname).split('/')[0]);
  }, [location.pathname]);

  return basePath;
}

export default useBasePath;
