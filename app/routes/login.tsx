import { Form, redirect } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type { Route } from "./+types/login";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Login - Amazing Safari" }];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const loginUserData = {
    email,
    password,
  };

  // TODO: ky.post("/auth/login", loginUserData)
  const response = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginUserData),
  });
  if (!response.ok) return null;
  const loginResult = await response.json();

  console.log({ loginResult });

  return redirect("/dashboard");
}

export default function LoginPage() {
  return (
    <div className="container mx-auto max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Welcome back! Please login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
