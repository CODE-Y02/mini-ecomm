"use server";
import { db } from "@/lib/db";

export const getProductWithVariants = async (id: string) => {
  const products = await db.product.findUnique({
    where: { id: id },
    include: { variants: true },
  });
  return products;
};

export const getProducts = async () => {
  const products = await db.product.findMany();
  return products;
};

export const getProductById = async (id: string) => {
  const product = await db.product.findUnique({
    where: { id },
  });
  return product;
};
