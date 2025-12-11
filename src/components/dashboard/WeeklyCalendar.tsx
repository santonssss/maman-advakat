import { useState, useMemo } from "react";
import type { Case } from "@/types";
import {
  format,
  addDays,
  startOfWeek,
  differenceInDays,
  isSameDay,
} from "date-fns";
import { ru } from "date-fns/locale";
import { Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
interface WeeklyCalendarProps {
  cases: Case[];
}

interface DeadlineThresholds {
  critical: number;
  warning: number;
  normal: number;
}

export function WeeklyCalendar({ cases }: WeeklyCalendarProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  const [thresholds, setThresholds] = useState<DeadlineThresholds>({
    critical: 3,
    warning: 7,
    normal: 30,
  });

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));
  }, [currentWeekStart]);
  const navigate = useNavigate();
  const getDeadlineStatus = (deadline: Date) => {
    const daysLeft = differenceInDays(deadline, new Date());

    if (daysLeft < 0) return "overdue";
    if (daysLeft <= thresholds.critical) return "critical";
    if (daysLeft <= thresholds.warning) return "warning";
    if (daysLeft <= thresholds.normal) return "normal";
    return "future";
  };

  const getCasesForDay = (day: Date) => {
    return cases.filter(
      (c) => c.status !== "completed" && isSameDay(c.nearestDeadline, day)
    );
  };

  const prevWeek = () => setCurrentWeekStart(addDays(currentWeekStart, -7));
  const nextWeek = () => setCurrentWeekStart(addDays(currentWeekStart, 7));
  const goToToday = () =>
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));

  return (
    <div className="card-premium p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground">
            Календарь дедлайнов
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {format(currentWeekStart, "d MMMM", { locale: ru })} —{" "}
            {format(addDays(currentWeekStart, 6), "d MMMM yyyy", {
              locale: ru,
            })}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={goToToday}
            className="text-xs"
          >
            Сегодня
          </Button>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={prevWeek}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={nextWeek}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Settings */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 bg-card border-border" align="end">
              <div className="space-y-4">
                <h3 className="font-medium text-sm text-foreground">
                  Настройки сроков
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-red-500 deadline-critical" />
                      <span className="text-sm text-muted-foreground">
                        Критично
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">до</span>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={thresholds.critical}
                        onChange={(e) =>
                          setThresholds({
                            ...thresholds,
                            critical: Number(e.target.value),
                          })
                        }
                        className="w-12 h-7 rounded border border-border bg-secondary/50 px-2 text-sm text-center text-foreground focus:border-primary/50 focus:outline-none"
                      />
                      <span className="text-xs text-muted-foreground">дн.</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-blue-500" />
                      <span className="text-sm text-muted-foreground">
                        Скоро
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">до</span>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={thresholds.warning}
                        onChange={(e) =>
                          setThresholds({
                            ...thresholds,
                            warning: Number(e.target.value),
                          })
                        }
                        className="w-12 h-7 rounded border border-border bg-secondary/50 px-2 text-sm text-center text-foreground focus:border-primary/50 focus:outline-none"
                      />
                      <span className="text-xs text-muted-foreground">дн.</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-emerald-500" />
                      <span className="text-sm text-muted-foreground">
                        В запасе
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-muted-foreground">до</span>
                      <input
                        type="number"
                        min="1"
                        max="60"
                        value={thresholds.normal}
                        onChange={(e) =>
                          setThresholds({
                            ...thresholds,
                            normal: Number(e.target.value),
                          })
                        }
                        className="w-12 h-7 rounded border border-border bg-secondary/50 px-2 text-sm text-center text-foreground focus:border-primary/50 focus:outline-none"
                      />
                      <span className="text-xs text-muted-foreground">дн.</span>
                    </div>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500 deadline-critical" />
          <span className="text-xs text-muted-foreground">
            ≤{thresholds.critical} дн.
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
          <span className="text-xs text-muted-foreground">
            ≤{thresholds.warning} дн.
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          <span className="text-xs text-muted-foreground">
            ≤{thresholds.normal} дн.
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
          <span className="text-xs text-muted-foreground">Просрочено</span>
        </div>
      </div>

      {/* Week grid */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => {
          const dayCases = getCasesForDay(day);
          const isToday = isSameDay(day, new Date());

          return (
            <div
              key={day.toISOString()}
              className={`min-h-[120px] rounded-lg border p-2 transition-colors ${
                isToday
                  ? "border-primary/40 bg-primary/5"
                  : "border-border bg-secondary/20 hover:bg-secondary/40"
              }`}
            >
              {/* Day header */}
              <div className="mb-2 pb-2 border-b border-border/50">
                <p
                  className={`text-xs font-medium ${
                    isToday ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {format(day, "EEE", { locale: ru })}
                </p>
                <p
                  className={`text-lg font-display font-semibold ${
                    isToday ? "text-primary" : "text-foreground"
                  }`}
                >
                  {format(day, "d")}
                </p>
              </div>

              {/* Tasks */}
              <div className="space-y-1.5">
                {dayCases.map((caseItem) => {
                  const status = getDeadlineStatus(caseItem.nearestDeadline);
                  const daysLeft = differenceInDays(
                    caseItem.nearestDeadline,
                    new Date()
                  );

                  return (
                    <Tooltip key={caseItem.id}>
                      <TooltipTrigger asChild>
                        <div
                          className="flex items-center gap-1.5 p-1.5 rounded bg-background/80 border border-border/50 cursor-pointer hover:border-border transition-colors group"
                          onClick={() => navigate(`/cases/${caseItem.id || 6}`)}
                        >
                          {" "}
                          <span
                            className={`h-2.5 w-2.5 rounded-full flex-shrink-0 ${
                              status === "overdue"
                                ? "bg-destructive deadline-critical"
                                : status === "critical"
                                ? "bg-red-500 deadline-critical"
                                : status === "warning"
                                ? "bg-blue-500"
                                : status === "normal"
                                ? "bg-emerald-500"
                                : "bg-muted-foreground/30"
                            }`}
                          />
                          <span className="text-xs text-foreground truncate flex-1">
                            {caseItem.number}ы
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-card border-border max-w-[250px] p-3"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span
                              className={`h-2 w-2 rounded-full ${
                                status === "overdue"
                                  ? "bg-destructive"
                                  : status === "critical"
                                  ? "bg-red-500"
                                  : status === "warning"
                                  ? "bg-blue-500"
                                  : "bg-emerald-500"
                              }`}
                            />
                            <span className="font-medium text-sm text-foreground">
                              {caseItem.number}
                            </span>
                          </div>
                          <p className="text-sm text-foreground">
                            {caseItem.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Клиент: {caseItem.client}
                          </p>
                          <div className="pt-1.5 mt-1.5 border-t border-border">
                            <p className="text-xs font-medium text-foreground">
                              Дедлайн:{" "}
                              {format(caseItem.nearestDeadline, "d MMMM yyyy", {
                                locale: ru,
                              })}
                            </p>
                            <p
                              className={`text-xs mt-0.5 ${
                                status === "overdue"
                                  ? "text-destructive"
                                  : status === "critical"
                                  ? "text-red-500"
                                  : status === "warning"
                                  ? "text-blue-500"
                                  : "text-emerald-500"
                              }`}
                            >
                              {daysLeft < 0
                                ? `Просрочено на ${Math.abs(daysLeft)} дн.`
                                : daysLeft === 0
                                ? "Сегодня!"
                                : `Осталось ${daysLeft} дн.`}
                            </p>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}

                {dayCases.length === 0 && (
                  <>
                    <p className="text-xs text-muted-foreground/50 text-center py-2">
                      —
                    </p>

                    <div className="flex justify-center gap-1.5 pt-1">
                      {(["critical", "warning", "normal"] as const).map(
                        (status, idx) => {
                          const circleClass =
                            status === "critical"
                              ? "bg-red-500 deadline-critical"
                              : status === "warning"
                              ? "bg-blue-500"
                              : "bg-emerald-500";

                          return (
                            <Tooltip key={idx}>
                              <TooltipTrigger asChild>
                                <button
                                  type="button"
                                  onClick={() => navigate("/cases/6")}
                                  className={`h-5 w-5 rounded-full ${circleClass} border border-border/60 flex items-center justify-center cursor-pointer transition-transform hover:scale-110`}
                                >
                                  <span className="sr-only">Пример дела</span>
                                </button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-card border-border p-2">
                                <span className="text-xs text-foreground">
                                  Истекает ключевой срок для дела 203-03!
                                </span>
                              </TooltipContent>
                            </Tooltip>
                          );
                        }
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
