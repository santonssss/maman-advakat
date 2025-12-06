import { Search, LayoutGrid, List, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CaseFiltersProps {
  viewMode: "table" | "cards";
  setViewMode: (mode: "table" | "cards") => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function CaseFilters({
  viewMode,
  setViewMode,
  statusFilter,
  setStatusFilter,
  searchQuery,
  setSearchQuery,
}: CaseFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск по делам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 rounded-lg border border-border bg-secondary/50 py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all"
          />
        </div>

        {/* Status filter */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 bg-secondary/50 border-border">
            <Filter className="h-4 w-4 mr-2 text-gold" />
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all">Все статусы</SelectItem>
            <SelectItem value="active">Активные</SelectItem>
            <SelectItem value="overdue">Просроченные</SelectItem>
            <SelectItem value="pending">Ожидание</SelectItem>
            <SelectItem value="completed">Завершённые</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* View toggle */}
      <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary/50 border border-border">
        <Button
          variant={viewMode === "table" ? "gold" : "ghost"}
          size="sm"
          onClick={() => setViewMode("table")}
          className="h-8"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === "cards" ? "gold" : "ghost"}
          size="sm"
          onClick={() => setViewMode("cards")}
          className="h-8"
        >
          <LayoutGrid className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
