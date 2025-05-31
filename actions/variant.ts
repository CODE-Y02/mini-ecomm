"use server";
import { db } from "@/lib/db";

export const getVariantsByProductId = async (productId: string) => {
  const variants = await db.variant.findMany({
    where: { productId: productId },
  });
  return variants;
};

export const getVariantById = async (id: string) => {
  const product = await db.variant.findUnique({
    where: { id },
  });
  return product;
};
