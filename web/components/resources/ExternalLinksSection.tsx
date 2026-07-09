import {
  EXTERNAL_LINK_CATEGORY_LABELS,
  RESOURCES_EXTERNAL_LINK_CATEGORIES,
} from "@/lib/labels";
import type { ExternalLink } from "@/lib/sanity/types";
import { isExternalUrl } from "@/lib/navigation";

type ExternalLinksSectionProps = {
  links: ExternalLink[];
  title?: string;
};

function groupLinks(links: ExternalLink[]) {
  return RESOURCES_EXTERNAL_LINK_CATEGORIES.map((category) => ({
    category,
    title: EXTERNAL_LINK_CATEGORY_LABELS[category] || category,
    links: links.filter((link) => link?.category === category),
  })).filter((group) => group.links.length > 0);
}

export function ExternalLinksSection({
  links,
  title = "Helpful Links",
}: ExternalLinksSectionProps) {
  const items = (links ?? []).filter((link) => Boolean(link?.title && link?.url));
  const groups = groupLinks(items);

  if (groups.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-12 sm:py-16">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-bhys-ink sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 text-base leading-7 text-bhys-ink-muted">
          Quick access to league information, weather updates, field details, and
          safety resources.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {groups.map((group) => (
            <div key={group.category}>
              <h3 className="text-lg font-semibold text-bhys-ink">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link._id || link.url}>
                    <a
                      href={link.url!}
                      className="group block rounded-xl border border-bhys-border bg-bhys-muted p-4 transition hover:border-bhys-green hover:shadow-sm"
                      {...(isExternalUrl(link.url!)
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <span className="font-medium text-bhys-ink group-hover:text-bhys-green">
                        {link.title}
                        {isExternalUrl(link.url!) ? (
                          <span className="sr-only"> (opens in new tab)</span>
                        ) : null}
                      </span>
                      {link.description ? (
                        <p className="mt-1 text-sm leading-6 text-bhys-ink-muted">
                          {link.description}
                        </p>
                      ) : null}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
