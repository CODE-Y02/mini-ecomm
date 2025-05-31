"use client";

import { Suspense } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/actions/product";
import { TConsolidatedCartItems } from "@/types/types";
import { Card, CardHeader } from "../ui/card";
import SubCartItem from "./SubCartItem";

const FALLBACK_IMAGE = "https://placehold.co/400x400?text=No+Image";

function CartItemImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Card className="relative w-24 h-24">
      <Image
        src={src || FALLBACK_IMAGE}
        alt={alt}
        fill
        className="object-cover rounded-md"
      />
    </Card>
  );
}

export default function CartItem({ item }: { item: TConsolidatedCartItems }) {
  const { data: product } = useQuery({
    queryKey: ["product", item.productId],
    queryFn: () => getProductById(item.productId),
    staleTime: 5 * 60 * 10000,
  });

  return (
    <div className="flex gap-4 p-4 border rounded-lg">
      <Suspense
        fallback={
          <div className="w-24 h-24 bg-muted animate-pulse rounded-md" />
        }
      >
        <CartItemImage
          src={product?.image || ""}
          alt={product?.name || product?.title || ""}
        />
      </Suspense>
      <Card className="flex-1 p-3 gap-3">
        <CardHeader className="text-lg">
          {product?.name || product?.title}
        </CardHeader>

        {/* <p className="text-sm text-muted-foreground">
          Variant: {variant?.name}
        </p>
        <p className="font-medium mt-1">${item.price}</p>
        <div className="flex items-center gap-4 mt-2">
          <QuantityControl
            quantity={item.quantity}
            onQuantityChange={onQuantityChange}
          />
          <Button variant="ghost" size="icon" onClick={onRemove}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div> */}
        <div className="space-y-3">
          {item?.variants?.map((variant) => (
            <SubCartItem
              key={item.productId + variant.id}
              price={product?.price || ""}
              productId={item.productId}
              qty={variant.qty}
              variantId={variant.id}
            />
          ))}
        </div>
      </Card>
      <div className="text-right">
        {/* <p className="font-medium">
          ${(item.price * item.quantity).toFixed(2)}
        </p> */}
      </div>
    </div>
  );
}
