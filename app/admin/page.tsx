"use server";
import OrderTable from "@/components/orders/OrderTable";
import { db } from "@/lib/db";
import { TOrder } from "@/types/types";

async function AdminPage() {
  const orders = await db.order.findMany({
    orderBy: { createdAt: "desc" }, // latest first
  });

  if (!orders?.length) {
    return (
      <div className="">
        <p>No Order Found</p>
      </div>
    );
  }

  return (
    <div>
      <OrderTable data={orders as unknown as TOrder[]} />
    </div>
  );
}

export default AdminPage;
