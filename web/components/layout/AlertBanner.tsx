import Link from "next/link";

type AlertBannerProps = {
  text?: string | null;
  link?: string | null;
};

export function AlertBanner({ text, link }: AlertBannerProps) {
  if (!text) {
    return null;
  }

  const content = (
    <p className="text-center text-sm font-medium">{text}</p>
  );

  return (
    <div className="bg-bhys-green text-white">
      <div className="mx-auto max-w-6xl px-4 py-2 sm:px-6 lg:px-8">
        {link ? (
          <Link href={link} className="block hover:underline">
            {content}
          </Link>
        ) : (
          content
        )}
      </div>
    </div>
  );
}
