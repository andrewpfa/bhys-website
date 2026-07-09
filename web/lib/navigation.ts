export function isNavLinkActive(pathname: string, href: string): boolean {
  if (!href) {
    return false;
  }

  const normalizedHref = href.split("?")[0].split("#")[0];

  if (normalizedHref === "/") {
    return pathname === "/";
  }

  return (
    pathname === normalizedHref || pathname.startsWith(`${normalizedHref}/`)
  );
}

export function isExternalUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}
