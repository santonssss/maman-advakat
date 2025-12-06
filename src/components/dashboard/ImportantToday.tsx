import { AlertCircle, Clock, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Case } from "@/types";
import { formatDistanceToNow, isPast, differenceInDays } from "date-fns";
import { ru } from "date-fns/locale";
import { Link } from "react-router-dom";

interface ImportantTodayProps {
  cases: Case[];
}

export function ImportantToday({ cases }: ImportantTodayProps) {
  const urgentCases = cases
    .filter((c) => c.status !== "completed")
    .sort((a, b) => a.nearestDeadline.getTime() - b.nearestDeadline.getTime())
    .slice(0, 5);

  const getDaysInfo = (deadline: Date) => {
    const days = differenceInDays(deadline, new Date());
    const isOverdue = isPast(deadline);

    if (isOverdue) {
      return { text: `Просрочено на ${Math.abs(days)} дн.`, status: "overdue" };
    }
    if (days <= 3) {
      return { text: `Осталось ${days} дн.`, status: "urgent" };
    }
    return {
      text: formatDistanceToNow(deadline, { locale: ru, addSuffix: true }),
      status: "normal",
    };
  };

  return (
    <div className="card-premium p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-gold" />
          Что важно сегодня
        </h2>
      </div>

      <div className="space-y-3">
        {urgentCases.map((caseItem) => {
          const daysInfo = getDaysInfo(caseItem.nearestDeadline);

          return (
            <div
              key={caseItem.id}
              className={`flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border hover:border-gold/30 transition-all group ${
                daysInfo.status === "overdue"
                  ? "overdue-bg border-overdue/20 overdue-pulse"
                  : ""
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-muted-foreground">
                    {caseItem.number}
                  </span>
                  <Badge
                    variant={
                      daysInfo.status === "overdue"
                        ? "overdue"
                        : daysInfo.status === "urgent"
                        ? "warning"
                        : "gold"
                    }
                    className="text-xs"
                  >
                    {daysInfo.text}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-foreground truncate">
                  {caseItem.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {caseItem.currentStage}
                </p>
              </div>

              <Link
                to={`/cases/${caseItem.id}`}
                className="ml-3 p-2 rounded-lg hover:bg-gold/10 transition-colors"
              >
                <ArrowRight className="h-4 w-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          );
        })}
      </div>

      {urgentCases.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Нет срочных дел на сегодня</p>
        </div>
      )}
    </div>
  );
}
