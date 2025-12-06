import { CheckCircle, Clock, Timer, AlertTriangle } from "lucide-react";

interface StatisticsCardsProps {
  data: {
    completedOnTime: number;
    completedLate: number;
    avgResponseTime: string;
    currentOverdue: number;
  };
}

const cards = [
  {
    key: "completedOnTime",
    label: "Завершено вовремя",
    icon: CheckCircle,
    color: "success",
    suffix: "",
  },
  {
    key: "completedLate",
    label: "Завершено с просрочкой",
    icon: Clock,
    color: "warning",
    suffix: "",
  },
  {
    key: "avgResponseTime",
    label: "Среднее время реакции",
    icon: Timer,
    color: "gold",
    suffix: "",
  },
  {
    key: "currentOverdue",
    label: "Текущие просроченные",
    icon: AlertTriangle,
    color: "overdue",
    suffix: "",
  },
];

export function StatisticsCards({ data }: StatisticsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const value = data[card.key as keyof typeof data];
        const isOverdue = card.key === "currentOverdue" && Number(value) > 0;

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
                      : "text-warning"
                  }`}
                >
                  {value}
                  {card.suffix}
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
                    : "bg-warning/10"
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
                      : "text-warning"
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
