import { ExternalLink, FileText, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Case } from "@/types";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Link } from "react-router-dom";

interface CasesTableProps {
  cases: Case[];
}

const statusConfig = {
  active: { label: "Активно", variant: "active" as const },
  overdue: { label: "Просрочено", variant: "overdue" as const },
  completed: { label: "Завершено", variant: "completed" as const },
  pending: { label: "Ожидание", variant: "pending" as const },
};

export function CasesTable({ cases }: CasesTableProps) {
  return (
    <div className="card-premium overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                № дела
              </th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Клиент
              </th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Статус
              </th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Срок
              </th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Этап
              </th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Файлы
              </th>
              <th className="text-right py-4 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {cases.map((caseItem) => {
              const status = statusConfig[caseItem.status];
              const isOverdue = caseItem.status === "overdue";

              return (
                <tr
                  key={caseItem.id}
                  className={`border-b border-border/50 hover:bg-secondary/20 transition-colors ${
                    isOverdue ? "overdue-bg overdue-pulse" : ""
                  }`}
                >
                  <td className="py-4 px-4">
                    <span className="text-sm font-semibold text-black">
                      {caseItem.number}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-gold" />
                      </div>
                      <span className="text-sm text-foreground">
                        {caseItem.client}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-sm ${
                        isOverdue
                          ? "text-overdue font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      {format(caseItem.nearestDeadline, "dd.MM.yyyy", {
                        locale: ru,
                      })}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-muted-foreground">
                      {caseItem.currentStage}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4 text-gold/50" />
                      <span className="text-sm text-muted-foreground">
                        {caseItem.files.length}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Link to={`/cases/${caseItem.id}`}>
                      <Button
                        variant="gold-outline"
                        className="text-black"
                        size="sm"
                      >
                        Открыть
                        <ExternalLink className="h-3 w-3 ml-1" />
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
