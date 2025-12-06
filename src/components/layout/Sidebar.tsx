import { NavLink } from "./NavLink";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  BarChart3,
  User,
  Scale,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Дашборд" },
  { to: "/cases", icon: Briefcase, label: "Мои дела" },
  { to: "/orders", icon: FileText, label: "Мои ордера" },
  { to: "/statistics", icon: BarChart3, label: "Статистика" },
  { to: "/profile", icon: User, label: "Профиль" },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/10 border border-gold/30">
            <Scale className="h-5 w-5 text-gold" />
          </div>
          <div>
            <h1 className="font-display text-lg font-semibold text-gold">
              Maman Advakatura
            </h1>
            <p className="text-xs text-muted-foreground">Кабинет адвоката</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              activeClassName="sidebar-item-active bg-sidebar-accent text-sidebar-accent-foreground"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <div className="rounded-lg bg-gold/5 border border-gold/20 p-3 text-center space-y-1">
            <p className="text-xs text-muted-foreground tracking-tight">
              © {new Date().getFullYear()} Все права защищены
            </p>
            <p className="text-xs font-medium text-gold">
              Разработчик — Сарвар Калмуратов
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
