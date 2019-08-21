function normalizePathname(pathname) {
  if (pathname.charAt(0) === '/') {
    pathname = pathname.substr(1);
  }
  if (pathname.charAt(pathname.length - 1) === '/') {
    pathname = pathname.substr(0, pathname.length - 1);
  }
  return pathname;
}

export default normalizePathname;
