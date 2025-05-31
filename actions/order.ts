"use server";
import { ICartItem } from "@/lib/store/cart";
import { TFormSchema } from "@/components/checkout/CheckoutForm";
import { db } from "@/lib/db";
import { TOrderStatus } from "@/types/types";
import { sendEmail } from "@/lib/mail";

type TCreateOrder = {
  items: ICartItem[];
  checkoutInfo: TFormSchema;
};

export const createOrder = async (input: TCreateOrder) => {
  const { checkoutInfo } = input;
  const address = `${checkoutInfo.address}, ${checkoutInfo.city}, ${checkoutInfo.state}, ${checkoutInfo.zipCode}`;

  const total = input.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  try {
    const order = await db.$transaction(async (query) => {
      // create pending order
      const order = await query.order.create({
        data: {
          address: address,
          customerEmail: checkoutInfo.email,
          customerName: checkoutInfo.fullName,
          status: TOrderStatus.PENDING,
          total: total,
        },
      });

      // create orderItems
      await query.orderItem.createMany({
        data: input.items.map((itm) => ({
          orderId: order.id,
          variantId: itm.variant.id,
          quantity: itm.quantity,
          total: Number(itm.price) * Number(itm.quantity),
          price: itm.price,
        })),
      });

      return order;
    });
    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    return false;
  }
};

export const changeOrderStatus = async (
  orderId: string,
  newStatus: TOrderStatus
) => {
  try {
    const order = await db.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      console.error("Order not found:", orderId);
      return false;
    }

    if (order.status === newStatus) {
      console.log("Status is already the same.", orderId, newStatus);
      return true;
    }

    await db.order.update({
      where: { id: orderId },
      data: {
        status: newStatus,
      },
    });

    sendEmail({
      to: order.customerEmail,
      subject: `"${newStatus}" - Order Status Changed OrderId: ${order.id}`,
      message: `
      Hi ${order.customerName}, Status of your order with orderId ${order.id} with total ${order.total}$ has Been changed to ${newStatus} 
      `,
    });

    console.log("Order status changed successfully:", orderId, newStatus);
    return true;
  } catch (error) {
    console.error("Error changing order status:", orderId, newStatus, error);
    return false;
  }
};
