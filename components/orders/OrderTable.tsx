"use client";

import { DataTable } from "../ui/data-table";
import { columns } from "./columns";
import { TOrder } from "@/types/types";

type Props = {
  data: TOrder[];
};

function OrderTable({ data }: Props) {
  return (
    <div className="p-3">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default OrderTable;
