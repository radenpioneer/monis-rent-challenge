import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-6 sm:px-6">
      <Link href="/" className="flex items-center gap-3 rounded-lg">
        <span aria-hidden className="grid size-9 place-items-center rounded-xl bg-emerald-800">
          <svg viewBox="0 0 32 32" className="size-5" fill="none">
            <path d="M6 13h20v3.5H6z" fill="#F2E6D2" />
            <path d="M8.5 16.5h3V25h-3zM20.5 16.5h3V25h-3z" fill="#F2E6D2" />
          </svg>
        </span>
        <span>
          <span className="block text-lg font-semibold leading-none tracking-tight text-stone-900">
            Monis
          </span>
          <span className="mt-1 block text-[0.65rem] uppercase leading-none tracking-[0.2em] text-stone-500">
            Workspace Designer
          </span>
        </span>
      </Link>
      <p className="hidden text-sm text-stone-500 sm:block">
        Design a workspace. Rent it by the week.
      </p>
    </header>
  );
}
