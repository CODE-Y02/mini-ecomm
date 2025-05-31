"use client";

import { getVariantById } from "@/actions/variant";
import { useQuery } from "@tanstack/react-query";
import { Card } from "../ui/card";
import { QuantityControl } from "../ui/quantity-control";
import { useCartStore } from "@/lib/store/cart";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

const SubCartItem = ({
  variantId,
  qty,
  productId,
  price,
}: {
  productId: string;
  variantId: string;
  qty: number;
  price: string | number;
}) => {
  const { data: variant } = useQuery({
    queryKey: ["variant", variantId],
    queryFn: () => getVariantById(variantId),
    staleTime: 5 * 60 * 10000,
    enabled: !!variantId,
  });
  const { updateQuantity, removeItem } = useCartStore((state) => state);

  const onRemove = () => {
    removeItem(productId, variantId);
  };

  return (
    <Card className="flex-row items-center p-2">
      <p className="text-muted-foreground font-medium w-44"> {variant?.name}</p>

      <div className="flex gap-3 items-center w-44">
        <p>${price}</p>x<p>Qty : {qty}</p>
      </div>
      <p className="font-medium w-44">SubTotal : ${Number(price) * qty}</p>
      <div className="flex ml-auto">
        <QuantityControl
          quantity={qty}
          onQuantityChange={(qty) => updateQuantity(productId, variantId, qty)}
        />
        <Button variant="ghost" size="icon" onClick={onRemove}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </Card>
  );
};

export default SubCartItem;
