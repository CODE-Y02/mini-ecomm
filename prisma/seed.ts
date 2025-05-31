import { db } from "@/lib/db";

async function main() {
  // Delete all existing data
  await db.orderItem.deleteMany();
  await db.order.deleteMany();
  await db.inventory.deleteMany();
  await db.variant.deleteMany();
  await db.product.deleteMany();

  // Create products with variants and inventory
  const products = [
    {
      name: 'T-Shirt',
      description: 'A comfortable cotton t-shirt',
      price: 20,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      variants: [
        { name: 'Small', price: 20, inventory: 10 },
        { name: 'Medium', price: 20, inventory: 15 },
        { name: 'Large', price: 20, inventory: 5 },
      ],
    },
    {
      name: 'Hoodie',
      description: 'A warm and stylish hoodie',
      price: 40,
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      variants: [
        { name: 'Small', price: 40, inventory: 8 },
        { name: 'Medium', price: 40, inventory: 12 },
        { name: 'Large', price: 40, inventory: 6 },
      ],
    },
    {
      name: 'Cap',
      description: 'A cool cap for sunny days',
      price: 15,
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      variants: [
        { name: 'One Size', price: 15, inventory: 20 },
      ],
    },
  ];

  for (const product of products) {
    const createdProduct = await db.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
      },
    });

    for (const variant of product.variants) {
      const createdVariant = await db.variant.create({
        data: {
          name: variant.name,
          price: variant.price,
          productId: createdProduct.id,
        },
      });
      await db.inventory.create({
        data: {
          variantId: createdVariant.id,
          quantity: variant.inventory,
        },
      });
    }
  }

  console.log('Database seeded!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  }); 