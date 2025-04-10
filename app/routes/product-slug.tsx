import type { Route } from "./+types/product-slug";
import type { Product } from "~/modules/product/type";
import { parseHtmlToReact } from "~/lib/html";
import { convertCurrencyToIDR } from "~/lib/currency";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Product - Amazing Safari" },
    { name: "description", content: "Description" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const response = await fetch(
    `${process.env.BACKEND_API_URL}/products/${params.slug}`
  );
  const product: Product = await response.json();
  return product;
}

export default function ProductSlug({ loaderData }: Route.ComponentProps) {
  const product = loaderData;

  return (
    <div className="container mx-auto">
      <div
        key={product.id}
        className="flex bg-white dark:bg-gray-800 rounded-lg overflow-hidden"
      >
        <div className="aspect-square">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2 dark:text-white">
            {product.name}
          </h2>
          <p className="prose text-gray-600 dark:text-gray-300 mb-4">
            {parseHtmlToReact(
              product.description?.substring(0, 100).concat("...")
            )}
          </p>
          <p className="text-lg font-bold text-green-600 dark:text-green-400">
            {convertCurrencyToIDR(product.price)}
          </p>
        </div>
      </div>
    </div>
  );
}
