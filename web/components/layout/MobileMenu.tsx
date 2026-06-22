"use client";

import Link from "next/link";
import { useState } from "react";

import type { NavigationLink } from "@/lib/sanity/types";

type MobileMenuProps = {
  links: NavigationLink[];
  registerLabel: string;
  registerUrl: string;
};

export function MobileMenu({ links, registerLabel, registerUrl }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex items-center justify-center rounded-md border border-bhys-border p-2 text-bhys-ink"
        onClick={() => setOpen((current) => !current)}
      >
        <span className="sr-only">Toggle navigation</span>
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {open ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {open ? (
        <nav
          id="mobile-menu"
          className="absolute left-0 right-0 top-full z-50 border-b border-bhys-border bg-white shadow-md"
        >
          <ul className="flex flex-col gap-1 px-4 py-4">
            {links.map((link) =>
              link?.label && link?.url ? (
                <li key={`${link.label}-${link.url}`}>
                  <Link
                    href={link.url}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-bhys-ink hover:bg-bhys-muted"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ) : null,
            )}
            {registerUrl ? (
              <li className="pt-2">
                <Link
                  href={registerUrl}
                  className="block rounded-full bg-bhys-green px-4 py-2 text-center text-sm font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  {registerLabel}
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
