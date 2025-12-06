import {
  User,
  Phone,
  Mail,
  Link as LinkIcon,
  Calendar,
  FileText,
  Upload,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Case } from "@/types";
import { format, differenceInDays, isPast } from "date-fns";
import { ru } from "date-fns/locale";
import { Link } from "react-router-dom";

interface CaseInfoProps {
  caseData: Case;
}

const statusConfig = {
  active: { label: "Активно", variant: "active" as const },
  overdue: { label: "Просрочено", variant: "overdue" as const },
  completed: { label: "Завершено", variant: "completed" as const },
  pending: { label: "Ожидание", variant: "pending" as const },
};

export function CaseInfo({ caseData }: CaseInfoProps) {
  const status = statusConfig[caseData.status];
  const isOverdue =
    isPast(caseData.nearestDeadline) && caseData.status !== "completed";
  const daysLeft = differenceInDays(caseData.nearestDeadline, new Date());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-premium p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="text-sm text-muted-foreground">
              {caseData.number}
            </span>
            <h1 className="font-display text-xl font-semibold text-foreground mt-1">
              {caseData.title}
            </h1>
          </div>
          <Badge
            variant={status.variant}
            className={isOverdue ? "overdue-pulse" : ""}
          >
            {status.label}
          </Badge>
        </div>

        {/* Deadline warning */}
        {(isOverdue || daysLeft <= 3) && (
          <div
            className={`flex items-center gap-2 p-3 rounded-lg mb-4 ${
              isOverdue
                ? "bg-overdue/10 border border-overdue/30 overdue-pulse"
                : "bg-warning/10 border border-warning/30"
            }`}
          >
            <AlertTriangle
              className={`h-5 w-5 ${
                isOverdue ? "text-overdue" : "text-warning"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                isOverdue ? "text-overdue" : "text-warning"
              }`}
            >
              {isOverdue
                ? `Просрочено на ${Math.abs(daysLeft)} дней`
                : `Осталось ${daysLeft} дней до срока`}
            </span>
          </div>
        )}

        {/* Client info */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center">
              <User className="h-5 w-5 text-gold" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                {caseData.client}
              </p>
              <p className="text-xs text-muted-foreground">Клиент</p>
            </div>
          </div>

          {caseData.clientPhone && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 text-gold/70" />
              <span>{caseData.clientPhone}</span>
            </div>
          )}

          {caseData.clientEmail && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 text-gold/70" />
              <span>{caseData.clientEmail}</span>
            </div>
          )}

          {caseData.orderId && (
            <Link
              to="/orders"
              className="flex items-center gap-2 text-sm text-gold hover:text-gold-light transition-colors"
            >
              <LinkIcon className="h-4 w-4" />
              <span>Привязанный ордер</span>
            </Link>
          )}
        </div>
      </div>

      {/* Deadlines */}
      <div className="card-premium p-5">
        <h2 className="font-display text-base font-semibold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-gold" />
          Ключевые сроки
        </h2>

        <div className="space-y-3">
          {caseData.deadlines.map((deadline) => {
            const deadlineOverdue =
              isPast(deadline.date) && !deadline.completed;
            const deadlineDays = differenceInDays(deadline.date, new Date());

            return (
              <div
                key={deadline.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  deadline.completed
                    ? "bg-success/5 border-success/20"
                    : deadlineOverdue
                    ? "bg-overdue/5 border-overdue/20 overdue-pulse"
                    : "bg-secondary/30 border-border"
                }`}
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {deadline.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(deadline.date, "dd MMMM yyyy", { locale: ru })}
                  </p>
                </div>
                <Badge
                  variant={
                    deadline.completed
                      ? "success"
                      : deadlineOverdue
                      ? "overdue"
                      : "gold"
                  }
                >
                  {deadline.completed
                    ? "Выполнено"
                    : deadlineOverdue
                    ? `Просрочено ${Math.abs(deadlineDays)} дн.`
                    : `${deadlineDays} дн.`}
                </Badge>
              </div>
            );
          })}
        </div>
      </div>

      {/* Files */}
      <div className="card-premium p-5">
        <h2 className="font-display text-base font-semibold text-foreground mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-gold" />
          Документы
        </h2>

        <div className="space-y-2 mb-4">
          {caseData.files.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border hover:border-gold/30 transition-colors cursor-pointer"
            >
              <FileText className="h-4 w-4 text-gold" />
              <span className="text-sm text-foreground flex-1">
                {file.name}
              </span>
              <Badge variant="secondary" className="text-xs">
                {file.type}
              </Badge>
            </div>
          ))}
        </div>

        <label className="flex items-center justify-center gap-2 w-full h-16 rounded-lg border-2 border-dashed border-border bg-secondary/20 cursor-pointer hover:border-gold/50 transition-colors">
          <Upload className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Загрузить файл</span>
          <input type="file" className="hidden" />
        </label>
      </div>
    </div>
  );
}
