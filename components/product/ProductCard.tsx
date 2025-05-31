"use client";

import Image from "next/image";
import { TProduct } from "@/types/types";
import { ProductCardActions } from "./ProductCardActions";

export function ProductCard(product: TProduct) {
  return (
    <div className="group relative rounded-lg border p-4 hover:shadow-lg transition-shadow">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={product.image}
          alt={product.name || product.title || ""}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
        <p className="text-lg font-bold">${product.price}</p>
        <ProductCardActions productId={product.id} />
      </div>
    </div>
  );
}
