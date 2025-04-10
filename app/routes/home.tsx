import type { Products } from "~/modules/product/type";
import type { Route } from "./+types/home";
import { parseHtmlToReact } from "~/lib/html";
import { Link } from "react-router";
import { convertCurrencyToIDR } from "~/lib/currency";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Amazing Safari" },
    { name: "description", content: "Simple ecommerce for zoo merchandise." },
  ];
}

export async function loader({}: Route.LoaderArgs) {
  const response = await fetch(`${process.env.BACKEND_API_URL}/products`);
  const products: Products = await response.json();
  return products;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const products = loaderData;

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900">
      <h1 className="text-4xl font-bold text-center mb-4 dark:text-white">
        Amazing Safari
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
        Simple ecommerce to buy zoo merchandise.
      </p>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          return (
            <li key={product.id}>
              <Link to={`/products/${product.slug}`}>
                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden"
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
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
