import { useState } from "react";
import { Plus, Calendar, FileText, X, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DiaryEntry } from "@/types";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { toast } from "@/hooks/use-toast";

interface CaseDiaryProps {
  entries: DiaryEntry[];
}

const statusConfig = {
  planned: { label: "Запланировано", variant: "secondary" as const },
  "in-progress": { label: "В процессе", variant: "gold" as const },
  completed: { label: "Выполнено", variant: "success" as const },
};

export function CaseDiary({ entries }: CaseDiaryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    date: "",
    stage: "",
    title: "",
    content: "",
  });

  const handleSubmit = () => {
    if (!newEntry.title.trim() || !newEntry.content.trim()) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Запись добавлена",
      description: "Новая запись успешно добавлена в дневник",
    });

    setNewEntry({ date: "", stage: "", title: "", content: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="card-premium p-5 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-lg font-semibold text-foreground">
          Дневник дела
        </h2>
        <Button variant="gold" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Добавить запись
        </Button>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gold/20" />

        <div className="space-y-6">
          {entries.map((entry) => {
            const status = statusConfig[entry.status];

            return (
              <div key={entry.id} className="relative pl-10">
                {/* Timeline dot */}
                <div
                  className={`absolute left-2 top-2 h-4 w-4 rounded-full border-2 ${
                    entry.status === "completed"
                      ? "bg-success border-success"
                      : entry.status === "in-progress"
                      ? "bg-gold border-gold"
                      : "bg-secondary border-gold/50"
                  }`}
                />

                <div className="card-premium p-4 ml-2">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="h-3 w-3 text-gold" />
                        <span className="text-xs text-muted-foreground">
                          {format(entry.date, "dd MMMM yyyy", { locale: ru })}
                        </span>
                      </div>
                      <h3 className="font-display text-base font-semibold text-foreground">
                        {entry.title}
                      </h3>
                      <p className="text-xs text-gold mt-0.5">{entry.stage}</p>
                    </div>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>

                  <p className="text-sm text-muted-foreground mt-3">
                    {entry.content}
                  </p>

                  {entry.files.length > 0 && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                      <FileText className="h-4 w-4 text-gold/70" />
                      <span className="text-xs text-muted-foreground">
                        {entry.files.length} файл(ов)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {entries.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Calendar className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Записей пока нет</p>
          <p className="text-xs mt-1">Добавьте первую запись в дневник</p>
        </div>
      )}

      {/* Add Entry Modal */}
      {isModalOpen && (
        <>
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg">
            <div className="card-premium p-6 gold-glow">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Новая запись
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsModalOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Дата
                    </label>
                    <input
                      type="date"
                      value={newEntry.date}
                      onChange={(e) =>
                        setNewEntry({ ...newEntry, date: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-secondary/50 p-2.5 text-sm text-foreground focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Этап
                    </label>
                    <input
                      type="text"
                      value={newEntry.stage}
                      onChange={(e) =>
                        setNewEntry({ ...newEntry, stage: e.target.value })
                      }
                      placeholder="Например: Судебное заседание"
                      className="w-full rounded-lg border border-border bg-secondary/50 p-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Заголовок
                  </label>
                  <input
                    type="text"
                    value={newEntry.title}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, title: e.target.value })
                    }
                    placeholder="Краткое описание"
                    className="w-full rounded-lg border border-border bg-secondary/50 p-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Описание
                  </label>
                  <textarea
                    value={newEntry.content}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, content: e.target.value })
                    }
                    placeholder="Подробное описание выполненной работы..."
                    className="w-full h-24 rounded-lg border border-border bg-secondary/50 p-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 resize-none transition-all"
                  />
                </div>

                <label className="flex items-center justify-center gap-2 w-full h-14 rounded-lg border-2 border-dashed border-border bg-secondary/20 cursor-pointer hover:border-gold/50 transition-colors">
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Прикрепить файлы
                  </span>
                  <input type="file" multiple className="hidden" />
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Отмена
                </Button>
                <Button variant="gold" onClick={handleSubmit}>
                  Добавить
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
