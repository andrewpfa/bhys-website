export function parseDate(value?: string | null): Date | null {
  if (!value) {
    return null;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export function formatDate(value?: string | null): string | null {
  const date = parseDate(value);
  if (!date) {
    return null;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function formatDateIso(value?: string | null): string | null {
  const date = parseDate(value);
  if (!date) {
    return null;
  }

  return date.toISOString().split("T")[0] ?? null;
}
