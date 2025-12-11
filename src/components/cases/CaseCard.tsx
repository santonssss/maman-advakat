import { Calendar, User, FileText, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Case } from "@/types";
import { format, differenceInDays, isPast } from "date-fns";
import { ru } from "date-fns/locale";
import { Link } from "react-router-dom";

interface CaseCardProps {
  caseItem: Case;
}

const statusConfig = {
  active: { label: "Активно", variant: "active" as const },
  overdue: { label: "Просрочено", variant: "overdue" as const },
  completed: { label: "Завершено", variant: "completed" as const },
  pending: { label: "Ожидание", variant: "pending" as const },
};

export function CaseCard({ caseItem }: CaseCardProps) {
  const status = statusConfig[caseItem.status];
  const isOverdue =
    caseItem.status === "overdue" || isPast(caseItem.nearestDeadline);
  const daysLeft = differenceInDays(caseItem.nearestDeadline, new Date());

  return (
    <div
      className={`card-premium-hover p-5 ${
        isOverdue ? "border-overdue/30 overdue-pulse" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-xs text-muted-foreground">
            {caseItem.number}
          </span>
          <h3 className="font-display text-base font-semibold text-foreground mt-1 line-clamp-2">
            {caseItem.title}
          </h3>
        </div>
        <Badge variant={status.variant}>{status.label}</Badge>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4 text-gold/70" />
          <span className="truncate">{caseItem.client}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 text-gold/70" />
          <span>
            Срок:{" "}
            {format(caseItem.nearestDeadline, "dd.MM.yyyy", { locale: ru })}
          </span>
        </div>

        {caseItem.files.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4 text-gold/70" />
            <span>{caseItem.files.length} файл(ов)</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div
          className={`text-sm font-medium ${
            isOverdue
              ? "text-overdue"
              : daysLeft <= 3
              ? "text-warning"
              : "text-gold"
          }`}
        >
          {isOverdue
            ? `Просрочено на ${Math.abs(daysLeft)} дн.`
            : `Осталось ${daysLeft} дн.`}
        </div>
        <Link to={`/cases/${caseItem.id}`}>
          <Button variant="gold-outline" className="text-black" size="sm">
            Открыть
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
