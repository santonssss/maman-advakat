import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface CasesChartProps {
  data: Array<{
    month: string;
    active: number;
    completed: number;
    overdue: number;
  }>;
}

export function CasesChart({ data }: CasesChartProps) {
  return (
    <div className="card-premium p-5">
      <h2 className="font-display text-lg font-semibold text-foreground mb-6">
        Статистика дел по месяцам
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="hsl(45 30% 20% / 0.3)"
            />
            <XAxis
              dataKey="month"
              stroke="hsl(45 10% 60%)"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="hsl(45 10% 60%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0 0% 7%)",
                border: "1px solid hsl(45 30% 20%)",
                borderRadius: "8px",
                color: "hsl(45 20% 95%)",
              }}
              labelStyle={{ color: "hsl(45 72% 47%)" }}
            />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) => (
                <span style={{ color: "hsl(45 20% 85%)", fontSize: "12px" }}>
                  {value}
                </span>
              )}
            />
            <Bar
              dataKey="active"
              name="Активные"
              fill="hsl(45 72% 47%)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="completed"
              name="Завершённые"
              fill="hsl(142 50% 40%)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="overdue"
              name="Просроченные"
              fill="hsl(25 95% 47%)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
