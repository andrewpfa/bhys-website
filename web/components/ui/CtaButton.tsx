import Link from "next/link";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "text";
  external?: boolean;
  className?: string;
};

const VARIANT_CLASSES = {
  primary:
    "inline-flex items-center justify-center rounded-full bg-bhys-green px-6 py-3 text-sm font-semibold text-white hover:bg-bhys-green-dark",
  secondary:
    "inline-flex items-center justify-center rounded-full border border-bhys-border bg-white px-6 py-3 text-sm font-semibold text-bhys-ink hover:bg-bhys-muted",
  text: "inline-flex items-center text-sm font-semibold text-bhys-green hover:text-bhys-green-dark",
};

export function CtaButton({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: CtaButtonProps) {
  const classes = `${VARIANT_CLASSES[variant]} ${className}`.trim();

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
        <span className="sr-only"> (opens in new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
