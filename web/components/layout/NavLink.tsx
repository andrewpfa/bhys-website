"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isNavLinkActive } from "@/lib/navigation";

type NavLinkProps = {
  href: string;
  label: string;
  onClick?: () => void;
  mobile?: boolean;
};

export function NavLink({ href, label, onClick, mobile = false }: NavLinkProps) {
  const pathname = usePathname();
  const active = isNavLinkActive(pathname, href);

  const baseClasses = mobile
    ? "block rounded-md px-3 py-2 text-sm font-medium"
    : "text-sm font-medium";

  const activeClasses = active
    ? mobile
      ? "bg-bhys-muted text-bhys-green"
      : "text-bhys-green"
    : mobile
      ? "text-bhys-ink hover:bg-bhys-muted"
      : "text-bhys-ink hover:text-bhys-green";

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`${baseClasses} ${activeClasses}`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}
