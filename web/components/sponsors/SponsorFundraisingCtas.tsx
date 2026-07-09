import { CtaButton } from "@/components/ui/CtaButton";
import { isExternalUrl } from "@/lib/navigation";

type SponsorFundraisingCtasProps = {
  donationUrl?: string | null;
  sponsorEnquiryFormUrl?: string | null;
};

export function SponsorFundraisingCtas({
  donationUrl,
  sponsorEnquiryFormUrl,
}: SponsorFundraisingCtasProps) {
  if (!donationUrl && !sponsorEnquiryFormUrl) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-bhys-border bg-white p-8">
      <h2 className="text-2xl font-bold tracking-tight text-bhys-ink">
        Support Beacon Hill Youth Soccer
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-7 text-bhys-ink-muted">
        Community support helps keep programs accessible for Beacon Hill
        families. Donate or explore sponsorship opportunities.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {donationUrl ? (
          <CtaButton href={donationUrl} external={isExternalUrl(donationUrl)}>
            Donate
          </CtaButton>
        ) : null}
        {sponsorEnquiryFormUrl ? (
          <CtaButton
            href={sponsorEnquiryFormUrl}
            variant="secondary"
            external={isExternalUrl(sponsorEnquiryFormUrl)}
          >
            Become a Sponsor
          </CtaButton>
        ) : null}
      </div>
    </div>
  );
}
