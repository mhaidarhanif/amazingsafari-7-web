import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Amazing Safari" },
    { name: "description", content: "Simple ecommerce for zoo merchandise." },
  ];
}

export default function Home() {
  return (
    <div>
      <h1>Amazing Safari</h1>
    </div>
  );
}
