"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductWithVariants } from "@/actions/product";
import { useCartStore } from "@/lib/store/cart";
import { Button } from "../ui/button";
import { QuantityControl } from "../ui/quantity-control";
import { ShoppingCartIcon } from "lucide-react";
import CartCount from "../cart/CartCount";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProductDialogProps {
  children: React.ReactNode;
  productId: string;
}

export function ProductDialog({ children, productId }: ProductDialogProps) {
  const [open, setOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductWithVariants(productId),
    staleTime: 1000 * 60 * 5,
    enabled: open,
  });

  const [selectedVariant, setSelectedVariant] = useState(data?.variants?.[0]);
  const [quantity, setQuantity] = useState(1);

  const { getVariantQuantity, addItem } = useCartStore((state) => state);

  useEffect(() => {
    if (data?.variants?.length && open && !selectedVariant) {
      setSelectedVariant(data.variants[0]);
    }
  }, [data?.variants, data?.variants?.length, open, selectedVariant]);

  const router = useRouter();

  const afterSubmit = () => {
    setOpen(false);
    setQuantity(0);
    setSelectedVariant(undefined);
  };

  const handleAddToCart = useCallback(() => {
    if (!data || !selectedVariant?.id) return;

    if (!quantity) {
      toast.error("Cannot add zero items", {
        style: {
          backgroundColor: "red",
          color: "white",
          border: 0,
          fontWeight: "800",
        },
      });

      return;
    }

    const cart = {
      id: productId,
      price: data.price,
      quantity: quantity,
      variant: { id: selectedVariant.id, name: selectedVariant.name },
    };
    addItem(cart);
    afterSubmit();
    return true;
  }, [data, selectedVariant, addItem, productId, quantity]);

  const handleBuyNow = useCallback(() => {
    const addedTOCart = handleAddToCart();
    if (addedTOCart) router.push("/checkout");
  }, [handleAddToCart, router]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Variant</DialogTitle>
        </DialogHeader>
        {data && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Variant</label>
              <div className="flex flex-wrap gap-2">
                {data?.variants?.map((variant) => {
                  return (
                    <Button
                      key={variant.id}
                      variant={
                        selectedVariant?.id === variant.id
                          ? "default"
                          : "outline"
                      }
                      className="flex-1 min-w-[100px]"
                      onClick={() => setSelectedVariant(variant)}
                    >
                      {variant.name}
                      <CartCount productId={productId} variantId={variant.id} />
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Quantity</label>
              <QuantityControl
                quantity={quantity}
                onQuantityChange={setQuantity}
              />
              <div className="text-xs text-muted-foreground mt-2">
                In cart:{" "}
                {data?.variants
                  ?.map(
                    (variant) =>
                      `${variant.name}: ${getVariantQuantity(
                        productId,
                        variant.id
                      )}`
                  )
                  .join(", ")}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleAddToCart}
              >
                <ShoppingCartIcon className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>

              <Button
                variant="destructive"
                className="flex-1"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
