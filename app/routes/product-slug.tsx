import type { Route } from "./+types/product-slug";
import type { Product } from "~/modules/product/type";
import { parseHtmlToReact } from "~/lib/html";
import { convertCurrencyToIDR } from "~/lib/currency";
import { Form, redirect } from "react-router";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { destroySession, getSession } from "~/sessions.server";
import type { AddCartItem } from "~/modules/cart/schema";

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

export async function action({ request }: Route.ActionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  if (!session.has("token")) {
    return redirect("/login");
  }
  const token = session.get("token");

  const formData = await request.formData();

  const addCartItemData: AddCartItem = {
    productId: String(formData.get("productId")),
    quantity: Number(formData.get("quantity")),
  };

  const response = await fetch(`${process.env.BACKEND_API_URL}/cart/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(addCartItemData),
  });
  if (!response.ok) {
    session.flash("error", "Failed to add item to cart");
    return redirect("/login", {
      headers: { "Set-Cookie": await destroySession(session) },
    });
  }

  return redirect("/cart");
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

          <div>
            <Form method="post" className="flex gap-4">
              <input type="hidden" name="productId" defaultValue={product.id} />
              <Input
                type="number"
                name="quantity"
                className="max-w-20"
                min={1}
                max={100}
                defaultValue={1}
              />
              <Button type="submit">Add to Cart</Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
