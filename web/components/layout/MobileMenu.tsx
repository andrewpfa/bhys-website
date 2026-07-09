"use client";

import { useEffect, useState } from "react";

import { CtaButton } from "@/components/ui/CtaButton";
import { isExternalUrl } from "@/lib/navigation";
import type { NavigationLink } from "@/lib/sanity/types";

import { NavLink } from "./NavLink";

type MobileMenuProps = {
  links: NavigationLink[];
  registerUrl: string;
};

export function MobileMenu({ links, registerUrl }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

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
          aria-label="Mobile navigation"
          className="absolute left-0 right-0 top-full z-50 border-b border-bhys-border bg-white shadow-md"
        >
          <ul className="flex flex-col gap-1 px-4 py-4">
            {links.map((link) =>
              link?.label && link?.url ? (
                <li key={`${link.label}-${link.url}`}>
                  <NavLink
                    href={link.url}
                    label={link.label}
                    mobile
                    onClick={() => setOpen(false)}
                  />
                </li>
              ) : null,
            )}
            {registerUrl ? (
              <li className="pt-2">
                <CtaButton
                  href={registerUrl}
                  external={isExternalUrl(registerUrl)}
                  className="w-full justify-center"
                >
                  Register Now
                </CtaButton>
              </li>
            ) : null}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
