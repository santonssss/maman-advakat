import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Order } from "@/types";
import { toast } from "@/hooks/use-toast";

interface ClosureRequestModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ClosureRequestModal({
  order,
  isOpen,
  onClose,
}: ClosureRequestModalProps) {
  const [report, setReport] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = () => {
    if (!report.trim()) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, введите текст отчёта",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Запрос отправлен",
      description: "Запрос на закрытие ордера успешно отправлен боссу",
    });

    setReport("");
    setFiles([]);
    onClose();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg"
          >
            <div className="card-premium p-6 gold-glow">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Запрос на закрытие ордера
                  </h2>
                  {order && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {order.number}
                    </p>
                  )}
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Краткий отчёт
                  </label>
                  <textarea
                    value={report}
                    onChange={(e) => setReport(e.target.value)}
                    placeholder="Опишите результаты работы по ордеру..."
                    className="w-full h-32 rounded-lg border border-border bg-secondary/50 p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 resize-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Прикрепить файлы
                  </label>
                  <label className="flex items-center justify-center gap-2 w-full h-20 rounded-lg border-2 border-dashed border-border bg-secondary/30 cursor-pointer hover:border-gold/50 transition-colors">
                    <Upload className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Перетащите или выберите файлы
                    </span>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>

                  {files.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <FileText className="h-4 w-4 text-gold" />
                          <span>{file.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
                <Button variant="outline" onClick={onClose}>
                  Отмена
                </Button>
                <Button variant="gold" onClick={handleSubmit}>
                  Отправить запрос
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
