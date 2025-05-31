import { Button } from "../ui/button";
import { ProductDialog } from "./ProductDialog";

export function ProductCardActions({ productId }: { productId: string }) {
  return (
    <div className="flex gap-2">
      <ProductDialog productId={productId}>
        <Button className="flex-1">Buy Now</Button>
      </ProductDialog>
    </div>
  );
}
