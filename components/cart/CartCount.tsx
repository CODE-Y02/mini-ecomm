"use client";
import { useCartStore } from "@/lib/store/cart";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

const CartCount = ({
  productId,
  variantId,
  className,
}: {
  productId?: string;
  variantId?: string;
  className?: string;
}) => {
  const { getItemQuantity, getVariantQuantity, totalQty } = useCartStore(
    (state) => state
  );

  const getCount = () => {
    if (productId && variantId) {
      return getVariantQuantity(productId, variantId);
    }
    if (productId) {
      return getItemQuantity(productId);
    }

    return totalQty();
  };

  const count = getCount();

  // Always render the Badge, but control its visibility or content
  return (
    <Badge
      variant="destructive"
      className={cn(`rounded-full `, count === 0 && "hidden", className)}
    >
      {count}
    </Badge>
  );
};

export default CartCount;
