import { getProducts } from "@/actions/product";
import { ProductCard } from "@/components/product/ProductCard";

const HomePage = async () => {
  const products = await getProducts();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default HomePage;
