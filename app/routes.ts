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
  ]),
] satisfies RouteConfig;
