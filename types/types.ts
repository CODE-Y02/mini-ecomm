// types.ts

// Type for Product model
export type TProduct = {
  id: string;
  name: string | null;
  title: string | null;
  description: string;
  price: number;
  image: string;
  variants?: TVariant[]; // Relation to Variant (optional)
  createdAt: Date;
  updatedAt: Date;
};

// Type for Variant model
export type TVariant = {
  id: string;
  name: string;
  value: string | null;
  price: number | null;
  productId: string;
  product?: TProduct; // Relation to Product (optional)
  inventory?: TInventory | null; // Relation to Inventory (optional)
  orderItems?: TOrderItem[]; // Relation to OrderItem (optional)
  createdAt: Date;
  updatedAt: Date;
};

// Type for Inventory model
export type TInventory = {
  id: string;
  variantId: string;
  variant?: TVariant; // Relation to Variant (optional)
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

// Type for Order model
export type TOrder = {
  id: string;
  customerName: string;
  customerEmail: string;
  address: string;
  status: TOrderStatus; // Enum type for order status
  items?: TOrderItem[]; // Relation to OrderItem (optional)
  total: number;
  createdAt: Date;
  updatedAt: Date;
};

// Type for OrderItem model
export type TOrderItem = {
  id: string;
  orderId: string;
  order?: TOrder; // Relation to Order (optional)
  variantId: string;
  variant?: TVariant; // Relation to Variant (optional)
  quantity: number;
  total: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export enum TOrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  TRANSACTION_FAILED = "TRANSACTION_FAILED",
}

export type TConsolidatedCartItems = {
  productId: string;
  variants: {
    id: string;
    qty: number;
  }[];
};
