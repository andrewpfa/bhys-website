import { formatDate, formatDateIso } from "@/lib/date";
import type { ImportantDate } from "@/lib/sanity/types";

type ImportantDatesProps = {
  dates?: ImportantDate[] | null;
};

export function ImportantDates({ dates }: ImportantDatesProps) {
  const items = (dates ?? []).filter((item) => item?.label);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 rounded-2xl border border-bhys-border bg-bhys-muted p-6">
      <h2 className="text-lg font-semibold text-bhys-ink">Important Dates</h2>
      <ul className="mt-4 space-y-4">
        {items.map((item, index) => {
          const formattedDate = formatDate(item.date);
          const dateTime = formatDateIso(item.date);

          return (
            <li
              key={`${item.label}-${item.date || index}`}
              className="flex flex-col gap-1 border-b border-bhys-border pb-4 last:border-b-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between"
            >
              <span className="font-medium text-bhys-ink">{item.label}</span>
              <div className="text-sm text-bhys-ink-muted">
                {formattedDate && dateTime ? (
                  <time dateTime={dateTime}>{formattedDate}</time>
                ) : (
                  <span>To be announced</span>
                )}
                {item.note ? (
                  <span className="mt-1 block sm:mt-0 sm:inline sm:before:content-['_·_']">
                    {item.note}
                  </span>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
