import { KPICards } from "@/components/dashboard/KPICards";
import { ImportantToday } from "@/components/dashboard/ImportantToday";
import { MiniCasesTable } from "@/components/dashboard/MiniCasesTable";
import { WeeklyCalendar } from "@/components/dashboard/WeeklyCalendar";
import { mockKPI, mockCases } from "@/data/mockData";

const Index = () => {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Дашборд
        </h1>
        <p className="text-muted-foreground mt-1">
          Добро пожаловать. Вот обзор ваших дел на сегодня.
        </p>
      </div>

      {/* KPI Cards */}
      <KPICards data={mockKPI} />

      {/* Weekly Calendar */}
      <WeeklyCalendar cases={mockCases} />

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ImportantToday cases={mockCases} />
        <MiniCasesTable cases={mockCases} />
      </div>
    </div>
  );
};

export default Index;
