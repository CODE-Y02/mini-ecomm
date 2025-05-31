"use client";

import { useCartStore } from "@/lib/store/cart";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/cart/CartItem";
import Link from "next/link";
import { useMemo } from "react";
import { TConsolidatedCartItems } from "@/types/types";

export default function CartPage() {
  const { items, totalQty } = useCartStore((state) => state);

  const totalPrice = useCartStore((state) => state.totalPrice());

  const consolidatedCartItems = useMemo(
    () =>
      items.reduce((prev, { id, variant, quantity }) => {
        const product = prev.find((item) => item.productId === id);
        if (product) {
          const variantItem = product.variants.find((v) => v.id === variant.id);
          if (variantItem) {
            variantItem.qty += quantity;
          } else {
            product.variants.push({ id: variant.id, qty: quantity });
          }
        } else {
          prev.push({
            productId: id,
            variants: [{ id: variant.id, qty: quantity }],
          });
        }
        return prev;
      }, [] as TConsolidatedCartItems[]),
    [items]
  );

  const qty = totalQty();

  if (qty === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground">
          Add some items to your cart to see them here
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="space-y-4">
        {consolidatedCartItems?.map((item) => (
          <CartItem key={item.productId} item={item} />
        ))}
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Total</h2>
          <p className="text-xl font-bold">${totalPrice.toFixed(2)}</p>
        </div>
        <Button className="w-full mt-4" asChild>
          <Link href={"/checkout"}>Proceed to Checkout</Link>
        </Button>
      </div>
    </div>
  );
}
