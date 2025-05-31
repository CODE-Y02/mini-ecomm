"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TOrderStatus } from "@/types/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { PenIcon } from "lucide-react";
import { changeOrderStatus } from "@/actions/order";
import { useRouter } from "next/navigation";

type Props = {
  orderId: string;
  status: TOrderStatus;
};

const formSchema = z.object({
  status: z.nativeEnum(TOrderStatus),
});

const OrderStatusAction = ({ orderId, status }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: status,
    },
  });

  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Debugging form submission
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await changeOrderStatus(orderId, data.status);
    router.refresh();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"icon"}>
          <PenIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="top-40 w-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogTitle>Change Status</DialogTitle>

            {/* Form field */}
            <FormField
              name="status"
              render={({ field }) => (
                <FormItem>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(TOrderStatus).map((v) => (
                        <SelectItem key={v} value={v}>
                          {v}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderStatusAction;
