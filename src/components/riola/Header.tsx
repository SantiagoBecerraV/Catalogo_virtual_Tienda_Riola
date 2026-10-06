import { Link } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { Bolt } from "./Bolt";
import { useTheme } from "@/lib/theme";

const linkCls =
  "relative py-1 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:scale-x-0 after:bg-primary after:transition-transform data-[status=active]:text-foreground data-[status=active]:after:scale-x-100";

export function Header() {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:grid-cols-[1fr_auto_1fr]">
        <Link to="/" className="flex min-w-0 items-center gap-1" aria-label="RIOLA inicio">
          <span className="font-brand text-3xl leading-none text-foreground">RIOLA</span>
          <Bolt className="h-7 w-7" />
        </Link>
        <nav className="order-3 col-span-2 flex justify-center gap-8 md:order-none md:col-span-1">
          <Link to="/" activeOptions={{ exact: true }} className={linkCls}>Inicio</Link>
          <Link to="/disenos" className={linkCls}>Diseños</Link>
          <Link to="/siluetas/$id" params={{ id: "normal" }} className={linkCls} activeOptions={{ exact: false }}>
            Siluetas
          </Link>
        </nav>
        <button
          onClick={toggle}
          role="switch"
          aria-checked={dark}
          aria-label={dark ? "Activar modo claro" : "Activar modo oscuro"}
          className="flex shrink-0 items-center gap-2 justify-self-end rounded-full bg-foreground py-1 pl-3 pr-1 text-xs font-semibold text-background transition-transform active:scale-95"
        >
          {dark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          <span className="hidden sm:inline">{dark ? "Modo Claro" : "Modo Oscuro"}</span>
          <span className="relative h-5 w-9 rounded-full bg-background/20">
            <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-primary transition-all ${dark ? "left-0.5" : "left-[18px]"}`} />
          </span>
        </button>
      </div>
    </header>
  );
}
