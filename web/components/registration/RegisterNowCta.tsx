import { CtaButton } from "@/components/ui/CtaButton";
import { isExternalUrl } from "@/lib/navigation";

type RegisterNowCtaProps = {
  url: string;
  title?: string;
  description?: string;
  className?: string;
};

export function RegisterNowCta({
  url,
  title = "Ready to register?",
  description = "Head to our registration portal to sign up your player.",
  className = "",
}: RegisterNowCtaProps) {
  return (
    <div
      className={`flex flex-col items-start gap-4 rounded-2xl border border-bhys-border bg-white p-6 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <div>
        <h2 className="text-xl font-semibold text-bhys-ink">{title}</h2>
        <p className="mt-1 text-sm text-bhys-ink-muted">{description}</p>
      </div>
      <CtaButton href={url} external={isExternalUrl(url)} className="shrink-0">
        Register Now
      </CtaButton>
    </div>
  );
}
