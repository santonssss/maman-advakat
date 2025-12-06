import { Badge } from "@/components/ui/badge";

interface MonthlyTableProps {
  data: Array<{
    month: string;
    active: number;
    completed: number;
    overdue: number;
  }>;
}

export function MonthlyTable({ data }: MonthlyTableProps) {
  return (
    <div className="card-premium overflow-hidden">
      <div className="p-5 border-b border-border">
        <h2 className="font-display text-lg font-semibold text-foreground">
          История по месяцам
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Месяц
              </th>
              <th className="text-center py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Активные
              </th>
              <th className="text-center py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Завершённые
              </th>
              <th className="text-center py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Просроченные
              </th>
              <th className="text-center py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Эффективность
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const efficiency =
                row.completed > 0
                  ? Math.round(
                      ((row.completed - row.overdue) / row.completed) * 100
                    )
                  : 100;

              return (
                <tr
                  key={row.month}
                  className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-foreground">
                      {row.month}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Badge variant="gold">{row.active}</Badge>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Badge variant="success">{row.completed}</Badge>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <Badge variant={row.overdue > 0 ? "overdue" : "secondary"}>
                      {row.overdue}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`text-sm font-semibold ${
                        efficiency >= 80
                          ? "text-success"
                          : efficiency >= 60
                          ? "text-warning"
                          : "text-overdue"
                      }`}
                    >
                      {efficiency}%
                    </span>
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
