import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";

import type { PortableTextValue } from "@/lib/sanity/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-4 text-base leading-7 text-bhys-ink-muted first:mt-0">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-10 text-2xl font-bold tracking-tight text-bhys-ink first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-semibold text-bhys-ink first:mt-0">
        {children}
      </h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-7 text-bhys-ink-muted">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-base leading-7 text-bhys-ink-muted">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-bhys-ink">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href = value?.href as string | undefined;
      if (!href) {
        return <>{children}</>;
      }
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          className="font-medium text-bhys-green underline hover:text-bhys-green-dark"
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    },
  },
};

type PortableTextRendererProps = {
  value?: PortableTextValue;
};

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div className="text-bhys-ink-muted">
      <PortableText value={value} components={components} />
    </div>
  );
}
