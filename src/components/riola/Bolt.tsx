export function Bolt({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`shrink-0 fill-primary ${className}`}>
      <path d="M14 1 4 14h6l-2 9 11-14h-6.5L14 1Z" />
    </svg>
  );
}

export function SectionTitle({ children, as: Tag = "h2" }: { children: React.ReactNode; as?: "h1" | "h2" }) {
  return (
    <Tag className="flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
      <Bolt className="h-7 w-7" />
      {children}
    </Tag>
  );
}
