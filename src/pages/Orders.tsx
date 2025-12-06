import { useState } from "react";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { ClosureRequestModal } from "@/components/orders/ClosureRequestModal";
import { mockOrders } from "@/data/mockData";
import type { Order } from "@/types";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequestClosure = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Мои ордера
        </h1>
        <p className="text-muted-foreground mt-1">
          Управление ордерами на представительство
        </p>
      </div>

      {/* Orders table */}
      <OrdersTable
        orders={mockOrders}
        onRequestClosure={handleRequestClosure}
      />

      {/* Closure request modal */}
      <ClosureRequestModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
      />
    </div>
  );
};

export default Orders;
