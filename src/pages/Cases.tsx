import { useState, useMemo } from "react";
import { CaseFilters } from "@/components/cases/CaseFilters";
import { CasesTable } from "@/components/cases/CasesTable";
import { CaseCard } from "@/components/cases/CaseCard";
import { mockCases } from "@/data/mockData";

const Cases = () => {
  const [viewMode, setViewMode] = useState<"table" | "cards">("table");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCases = useMemo(() => {
    return mockCases.filter((caseItem) => {
      const matchesStatus =
        statusFilter === "all" || caseItem.status === statusFilter;
      const matchesSearch =
        caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseItem.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseItem.number.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [statusFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Мои дела
        </h1>
        <p className="text-muted-foreground mt-1">
          Управление делами и контроль сроков
        </p>
      </div>

      {/* Filters */}
      <CaseFilters
        viewMode={viewMode}
        setViewMode={setViewMode}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Cases list */}
      {viewMode === "table" ? (
        <CasesTable cases={filteredCases} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredCases.map((caseItem) => (
            <CaseCard key={caseItem.id} caseItem={caseItem} />
          ))}
        </div>
      )}

      {filteredCases.length === 0 && (
        <div className="card-premium p-12 text-center">
          <p className="text-muted-foreground">Дела не найдены</p>
        </div>
      )}
    </div>
  );
};

export default Cases;
