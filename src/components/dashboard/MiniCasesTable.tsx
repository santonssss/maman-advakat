import { Briefcase, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Case } from "@/types";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Link } from "react-router-dom";

interface MiniCasesTableProps {
  cases: Case[];
}

const statusConfig = {
  active: { label: "Активно", variant: "active" as const },
  overdue: { label: "Просрочено", variant: "overdue" as const },
  completed: { label: "Завершено", variant: "completed" as const },
  pending: { label: "Ожидание", variant: "pending" as const },
};

export function MiniCasesTable({ cases }: MiniCasesTableProps) {
  const displayCases = cases.slice(0, 6);

  return (
    <div className="card-premium p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-gold" />
          Реестр дел
        </h2>
        <Link to="/cases">
          <Button
            variant="ghost"
            size="sm"
            className="text-gold hover:text-gold-light"
          >
            Все дела
            <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-2 text-xs font-medium text-muted-foreground">
                № дела
              </th>
              <th className="text-left py-2 px-2 text-xs font-medium text-muted-foreground">
                Статус
              </th>
              <th className="text-left py-2 px-2 text-xs font-medium text-muted-foreground">
                Срок
              </th>
              <th className="text-left py-2 px-2 text-xs font-medium text-muted-foreground">
                Этап
              </th>
              <th className="text-right py-2 px-2"></th>
            </tr>
          </thead>
          <tbody>
            {displayCases.map((caseItem) => {
              const status = statusConfig[caseItem.status];

              return (
                <tr
                  key={caseItem.id}
                  className={`border-b border-border/50 hover:bg-secondary/30 transition-colors ${
                    caseItem.status === "overdue"
                      ? "overdue-bg overdue-pulse"
                      : ""
                  }`}
                >
                  <td className="py-3 px-2">
                    <span className="text-sm font-medium text-foreground">
                      {caseItem.number}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </td>
                  <td className="py-3 px-2">
                    <span className="text-sm text-muted-foreground">
                      {format(caseItem.nearestDeadline, "dd.MM.yyyy", {
                        locale: ru,
                      })}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    <span className="text-sm text-muted-foreground truncate max-w-[120px] block">
                      {caseItem.currentStage}
                    </span>
                  </td>
                  <td className="py-3 px-2 text-right">
                    <Link to={`/cases/${caseItem.id}`}>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ExternalLink className="h-4 w-4 text-gold" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
