import { ShoppingBagIcon } from "lucide-react";
import CartCount from "../cart/CartCount";

// only to be use in the navbar
export const CartBtn = () => {
  return (
    <>
      <ShoppingBagIcon size={20} />
      <span className="text-sm font-medium">Cart</span>
      <CartCount />
    </>
  );
};
