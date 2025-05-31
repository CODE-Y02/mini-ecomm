import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ICartItem {
  id: string;
  price: number;
  quantity: number;
  variant: {
    id: string;
    name: string;
  };
}

interface CartStore {
  items: ICartItem[];
  addItem: (item: ICartItem) => void;
  removeItem: (id: string, variantId: string) => void;
  updateQuantity: (id: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  totalQty: () => number;
  totalPrice: () => number;
  getVariantQuantity: (id: string, variantId: string) => number;
  getItemQuantity: (id: string) => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.id === item.id && i.variant.id === item.variant.id
          );

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id && i.variant.id === item.variant.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          return { items: [...state.items, item] };
        });
      },
      removeItem: (id, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === id && item.variant.id === variantId)
          ),
        }));
      },
      updateQuantity: (id, variantId, quantity) => {
        set((state) => {
          // If quantity is 0 or less, remove the item
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (item) => !(item.id === id && item.variant.id === variantId)
              ),
            };
          }

          // Otherwise update the quantity
          return {
            items: state.items.map((item) =>
              item.id === id && item.variant.id === variantId
                ? { ...item, quantity }
                : item
            ),
          };
        });
      },
      clearCart: () => set({ items: [] }),
      totalQty: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },
      totalPrice: () =>
        get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
      getVariantQuantity: (id, variantId) => {
        const state = get();
        const item = state.items.find(
          (item) => item.id === id && item.variant.id === variantId
        );
        return item ? item.quantity : 0;
      },
      getItemQuantity: (id) => {
        const state = get();
        return state.items
          .filter((item) => item.id === id)
          .reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
