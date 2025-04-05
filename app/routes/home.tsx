import type { Products } from "~/modules/product/schema";
import type { Route } from "./+types/home";

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
    <div>
      <h1>Amazing Safari</h1>
      <p>Simple ecommerce to buy zoo merchandise.</p>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <div>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <img src={product.imageUrl} alt={product.name} />
                <p>Rp {product.price}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
