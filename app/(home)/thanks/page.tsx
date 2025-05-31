import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { db } from "@/lib/db";
import Link from "next/link";

const ThanksPage = async ({
  searchParams: { o: id },
}: {
  searchParams: { o: string };
}) => {
  const order = await db.order.findUnique({
    where: { id },
    include: { items: true },
  });
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl text-center">
      <h1 className="text-2xl font-bold mb-4">Thank you for your order!</h1>

      <div className="">
        <p>Your orderId ${order?.id}</p>
        <p>Your Order Total ${order?.total}</p>

        <div className="">
          <h3>Order Items</h3>
          {order?.items.map((item) => (
            <Card key={item.id}>
              <p>ID {item.id}</p>
              <p>{item.quantity} Nos</p>
              <p>Total {item.total}</p>
            </Card>
          ))}
        </div>
      </div>

      <Link href="/">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
};

export default ThanksPage;
