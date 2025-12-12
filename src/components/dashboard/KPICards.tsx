import { Briefcase, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import type { KPIData } from "@/types";

interface KPICardsProps {
  data: KPIData;
}

const cards = [
  {
    key: "activeCases",
    label: "Активных дел",
    icon: Briefcase,
    color: "black",
  },
  {
    key: "overdueCases",
    label: "Просроченных",
    icon: AlertTriangle,
    color: "overdue",
  },
  {
    key: "pendingCases",
    label: "Ожидание решения",
    icon: Clock,
    color: "pending",
  },
  {
    key: "completedThisMonth",
    label: "Завершено за месяц",
    icon: CheckCircle,
    color: "success",
  },
];

export function KPICards({ data }: KPICardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const value = data[card.key as keyof KPIData];
        const isOverdue = card.key === "overdueCases" && value > 0;

        return (
          <div
            key={card.key}
            className={`card-premium p-5 ${
              isOverdue ? "overdue-pulse border-overdue/30" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {card.label}
                </p>
                <p
                  className={`text-3xl font-display font-bold ${
                    card.color === "gold"
                      ? "text-gold"
                      : card.color === "overdue"
                      ? "text-overdue"
                      : card.color === "success"
                      ? "text-success"
                      : "text-gold-light"
                  }`}
                >
                  {value}
                </p>
              </div>
              <div
                className={`p-2.5 rounded-lg ${
                  card.color === "gold"
                    ? "bg-gold/10"
                    : card.color === "overdue"
                    ? "bg-overdue/10"
                    : card.color === "success"
                    ? "bg-success/10"
                    : "bg-gold/5"
                }`}
              >
                <card.icon
                  className={`h-5 w-5 ${
                    card.color === "gold"
                      ? "text-gold"
                      : card.color === "overdue"
                      ? "text-overdue"
                      : card.color === "success"
                      ? "text-success"
                      : "text-gold-light"
                  }`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
