import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface QuantityControlProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantityControl({
  quantity,
  onQuantityChange,
  min = 1,
  max,
  className = "",
}: QuantityControlProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onQuantityChange(quantity - 1)}
        disabled={quantity < min}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-8 text-center">{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onQuantityChange(quantity + 1)}
        disabled={max !== undefined && quantity > max}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
