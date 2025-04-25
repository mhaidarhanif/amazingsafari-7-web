import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/layout.tsx", [
    index("routes/home.tsx"),
    route("/about", "routes/about.tsx"),
    route("/products/:slug", "routes/product-slug.tsx"),

    route("/register", "routes/register.tsx"),
    route("/login", "routes/login.tsx"),
    route("/dashboard", "routes/dashboard.tsx"),
    route("/cart", "routes/cart.tsx"),

    // route("/products", "routes/products.tsx"),
  ]),
] satisfies RouteConfig;
