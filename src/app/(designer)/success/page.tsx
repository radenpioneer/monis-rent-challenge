import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 pb-16 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-ink">
        Your workspace is reserved 🎉
      </h1>
      <p className="text-sm text-ink-muted">
        Demo experience. No real rental has been placed. The confirmed date, area, duration
        and total land in a later slice.
      </p>
      <Link
        href="/"
        className="rounded-sm text-sm font-medium text-ink underline decoration-ink-faint underline-offset-4 transition-colors hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        Back to workspace
      </Link>
    </div>
  );
}
