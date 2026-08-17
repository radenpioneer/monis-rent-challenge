import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-6 sm:px-6">
      <Link
        href="/"
        className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        <span aria-hidden className="grid size-9 place-items-center rounded-xl bg-ink">
          <svg viewBox="0 0 32 32" className="size-5" fill="none">
            <path d="M6 13h20v3.5H6z" fill="#F9F2EA" />
            <path d="M8.5 16.5h3V25h-3zM20.5 16.5h3V25h-3z" fill="#F9F2EA" />
          </svg>
        </span>
        <span>
          <span className="block text-lg font-semibold leading-none tracking-tight text-ink">
            Monis
          </span>
          <span className="mt-1 block text-[0.65rem] uppercase leading-none tracking-[0.2em] text-ink-muted">
            Workspace Designer
          </span>
        </span>
      </Link>
      <p className="hidden text-sm text-ink-muted sm:block">
        Design a workspace. Rent it by the week.
      </p>
    </header>
  );
}
