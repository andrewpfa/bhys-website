type EmptyStateProps = {
  title?: string;
  message: string;
};

export function EmptyState({
  title = "Nothing here yet",
  message,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-bhys-border bg-white p-8 text-center">
      <h2 className="text-lg font-semibold text-bhys-ink">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-bhys-ink-muted">{message}</p>
    </div>
  );
}
