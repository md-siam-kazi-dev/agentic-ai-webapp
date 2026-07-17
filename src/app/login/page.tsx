"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { loginSchema, type LoginValues, DEMO_CREDENTIALS } from "@/lib/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoogleButton } from "@/components/google-button";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: LoginValues) {
    setServerError(null);
    setLoading(true);
    const { error } = await authClient.signIn.email(values);
    setLoading(false);
    if (error) {
      setServerError(error.message ?? "Unable to sign in. Check your credentials.");
      return;
    }
    toast.success("Signed in successfully", {
      description: "Welcome back! Redirecting you to your dashboard.",
    });
    router.push("/dashboard");
    router.refresh();
  }

  async function handleDemo() {
    setServerError(null);
    setValue("email", DEMO_CREDENTIALS.email);
    setValue("password", DEMO_CREDENTIALS.password);
    setLoading(true);
    const { error } = await authClient.signIn.email(DEMO_CREDENTIALS);
    setLoading(false);
    if (error) {
      setServerError(error.message ?? "Demo login failed. Try again.");
      return;
    }
    toast.success("Signed in successfully", {
      description: "Welcome back! Redirecting you to your dashboard.",
    });
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-bg px-4 py-12">
      <div className="flex w-full max-w-md flex-col gap-4">
        <Card className="border-border bg-white shadow-sm dark:bg-card">
          <CardHeader className="gap-1.5 px-6 pt-6 text-center sm:px-8">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Sign in to manage your roadmaps and track progress.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6 pt-4 sm:px-8">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <FieldGroup className="gap-5">
                <Field className="gap-2">
                  <GoogleButton />
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={handleDemo}
                    disabled={loading}
                  >
                    <Sparkles />
                    Try the demo account
                  </Button>
                </Field>

                <FieldSeparator>Or continue with</FieldSeparator>

                <Field className="gap-2">
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs font-medium text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </Field>

                <Field className="gap-2">
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    aria-invalid={!!errors.password}
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-xs font-medium text-destructive">
                      {errors.password.message}
                    </p>
                  )}
                </Field>

                {serverError && (
                  <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
                    {serverError}
                  </p>
                )}

                <Field className="gap-2">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing in…" : "Sign in"}
                  </Button>
                  <FieldDescription className="text-center">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-accent hover:underline">
                      Sign up
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
