import { StatisticsCards } from "@/components/statistics/StatisticsCards";
import { CasesChart } from "@/components/statistics/CasesChart";
import { MonthlyTable } from "@/components/statistics/MonthlyTable";
import { mockStatistics } from "@/data/mockData";

const Statistics = () => {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Статистика
        </h1>
        <p className="text-muted-foreground mt-1">
          Анализ эффективности и история дел
        </p>
      </div>

      {/* Statistics cards */}
      <StatisticsCards data={mockStatistics} />

      {/* Chart */}
      <CasesChart data={mockStatistics.monthlyData} />

      {/* Monthly table */}
      <MonthlyTable data={mockStatistics.monthlyData} />
    </div>
  );
};

export default Statistics;
