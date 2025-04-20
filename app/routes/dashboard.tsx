import { destroySession, getSession } from "~/sessions.server";
import type { Route } from "./+types/dashboard";
import { redirect } from "react-router";
import type { User } from "~/modules/user/type";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  if (!session.has("token")) {
    return redirect("/login");
  }

  const token = session.get("token");
  console.info("dashboard:token", token);

  // TODO: Get user data
  // TODO: ky.post("/auth/me")
  const response = await fetch(`${process.env.BACKEND_API_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    session.flash("error", "Failed to check user");
    return redirect("/login", {
      headers: { "Set-Cookie": await destroySession(session) },
    });
  }

  const userData: User = await response.json();
  console.info({ userData });

  return userData;
}

export default function DashboardPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
    </div>
  );
}
