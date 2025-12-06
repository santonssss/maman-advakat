import { FileCheck, Link as LinkIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Order } from "@/types";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Link } from "react-router-dom";

interface OrdersTableProps {
  orders: Order[];
  onRequestClosure: (order: Order) => void;
}

const statusConfig = {
  active: { label: "Активен", variant: "active" as const },
  "in-progress": { label: "В работе", variant: "gold" as const },
  "closure-requested": {
    label: "Запрос закрытия",
    variant: "warning" as const,
  },
  closed: { label: "Закрыт", variant: "completed" as const },
};

export function OrdersTable({ orders, onRequestClosure }: OrdersTableProps) {
  return (
    <div className="card-premium overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                № ордера
              </th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Клиент
              </th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Дата начала
              </th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Статус
              </th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Срок
              </th>
              <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Дело
              </th>
              <th className="text-right py-4 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const status = statusConfig[order.status];
              const canRequestClosure =
                order.status === "active" || order.status === "in-progress";

              return (
                <tr
                  key={order.id}
                  className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="text-sm font-semibold text-gold">
                      {order.number}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-foreground">
                      {order.client}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-muted-foreground">
                      {format(order.startDate, "dd.MM.yyyy", { locale: ru })}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant={status.variant}>{status.label}</Badge>
                    {order.status === "closure-requested" && (
                      <Badge variant="gold" className="ml-2 text-xs">
                        Запрос отправлен
                      </Badge>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {order.deadline ? (
                      <span className="text-sm text-muted-foreground">
                        {format(order.deadline, "dd.MM.yyyy", { locale: ru })}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground/50">
                        —
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    {order.caseId ? (
                      <Link
                        to={`/cases/${order.caseId}`}
                        className="flex items-center gap-1 text-gold hover:text-gold-light transition-colors"
                      >
                        <LinkIcon className="h-3 w-3" />
                        <span className="text-sm">Дело</span>
                      </Link>
                    ) : (
                      <span className="text-sm text-muted-foreground/50">
                        —
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right">
                    {canRequestClosure && (
                      <Button
                        variant="gold-outline"
                        size="sm"
                        onClick={() => onRequestClosure(order)}
                      >
                        <FileCheck className="h-4 w-4 mr-1" />
                        Запросить закрытие
                      </Button>
                    )}
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
