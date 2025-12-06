import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockProfile, mockNotifications } from "@/data/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TopBar() {
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-6">
      {/* Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск дел, клиентов..."
            className="w-full rounded-lg border border-border bg-secondary/50 py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-overdue text-xs font-bold text-foreground">
                  {unreadCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-80 bg-card border-border"
          >
            <div className="px-4 py-3 border-b border-border">
              <h3 className="font-display font-semibold text-foreground">
                Уведомления
              </h3>
            </div>
            {mockNotifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="flex flex-col items-start gap-1 p-4 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      notification.type === "overdue"
                        ? "bg-overdue"
                        : notification.type === "deadline"
                        ? "bg-warning"
                        : "bg-gold"
                    }`}
                  />
                  <span className="font-medium text-sm">
                    {notification.title}
                  </span>
                  {!notification.read && (
                    <Badge variant="gold" className="text-xs">
                      Новое
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground pl-4">
                  {notification.message}
                </p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="h-9 w-9 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center">
            <span className="text-sm font-semibold text-gold">
              {mockProfile.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-foreground">
              {mockProfile.fullName.split(" ").slice(0, 2).join(" ")}
            </p>
            <p className="text-xs text-muted-foreground">Адвокат</p>
          </div>
        </div>
      </div>
    </header>
  );
}
