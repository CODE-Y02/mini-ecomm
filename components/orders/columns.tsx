"use client";

import { TOrder, TOrderStatus } from "@/types/types";
import { ColumnDef } from "@tanstack/react-table";
import OrderStatusAction from "./OrderStatusAction";
import { Button } from "../ui/button";

export const columns: ColumnDef<TOrder>[] = [
  {
    accessorKey: "id",
    header: () => <div>OrderId</div>,
    enableResizing: true,
  },
  {
    accessorKey: "customerName",
    header: "Name",
  },
  {
    accessorKey: "customerEmail",
    header: "Email",
  },

  {
    accessorKey: "total",
    header: () => <div>Amount</div>,
    cell: ({ row }) => {
      const amount = Number(row.original.total);
      return <div className="font-medium">{amount}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      const status = row.original.status;

      const fail =
        status === TOrderStatus.CANCELLED ||
        status === TOrderStatus.TRANSACTION_FAILED;
      const success =
        status === TOrderStatus.DELIVERED || status === TOrderStatus.SHIPPED;

      return (
        <Button
          variant={fail ? "destructive" : success ? "default" : "outline"}
        >
          {status}
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      //   const status = row.original.status;

      return (
        <OrderStatusAction
          orderId={row.original.id}
          status={row.original.status}
        />
      );
    },
  },
];
