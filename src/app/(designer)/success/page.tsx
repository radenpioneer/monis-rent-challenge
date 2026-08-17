import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 pb-16 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-stone-900">
        Your workspace is reserved 🎉
      </h1>
      <p className="text-sm text-stone-500">
        Demo experience. No real rental has been placed. The confirmed date, area, duration
        and total land in a later slice.
      </p>
      <Link
        href="/"
        className="text-sm font-medium text-emerald-800 underline underline-offset-4"
      >
        Back to workspace
      </Link>
    </div>
  );
}
