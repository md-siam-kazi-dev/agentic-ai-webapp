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
import { registerSchema, type RegisterValues } from "@/lib/auth-schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoogleButton } from "@/components/google-button";
import { toast } from "sonner";

const passwordRules: { label: string; test: (v: string) => boolean }[] = [
  { label: "At least 8 characters", test: (v) => v.length >= 8 },
  { label: "One uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { label: "One lowercase letter", test: (v) => /[a-z]/.test(v) },
  { label: "One number", test: (v) => /\d/.test(v) },
  { label: "One special character", test: (v) => /[^A-Za-z0-9]/.test(v) },
];

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirm: "" },
    mode: "onChange",
  });

  const password = watch("password");

  async function onSubmit(values: RegisterValues) {
    setServerError(null);
    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
    });
    setLoading(false);
    if (error) {
      setServerError(error.message ?? "Unable to create account. Try again.");
      return;
    }
    toast.success("Account created successfully", {
      description: "Welcome to Pathwise! Redirecting you to your dashboard.",
    });
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-bg px-4 py-12">
      <div className="flex w-full max-w-md flex-col gap-4">
        <Card className="border-border bg-white shadow-sm dark:bg-card">
          <CardHeader className="gap-1.5 px-6 pt-6 text-center sm:px-8">
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <CardDescription>
              Start building personalized learning roadmaps in minutes.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6 pt-4 sm:px-8">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <FieldGroup className="gap-5">
                <Field className="gap-2">
                  <GoogleButton label="Sign up with Google" />
                </Field>

                <FieldSeparator>Or continue with</FieldSeparator>

                <Field className="gap-2">
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ada Lovelace"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-xs font-medium text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </Field>

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
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    aria-invalid={!!errors.password}
                    {...register("password")}
                  />
                  {password?.length > 0 && (
                    <ul className="mt-1 flex flex-col gap-1.5">
                      {passwordRules.map((rule) => {
                        const met = rule.test(password);
                        return (
                          <li
                            key={rule.label}
                            className={cn(
                              "flex items-center gap-1.5 text-xs",
                              met ? "text-accent" : "text-muted-foreground"
                            )}
                          >
                            {met ? <Check className="size-3.5" /> : <X className="size-3.5" />}
                            {rule.label}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {errors.password && password?.length === 0 && (
                    <p className="mt-1 text-xs font-medium text-destructive">
                      {errors.password.message}
                    </p>
                  )}
                </Field>

                <Field className="gap-2">
                  <FieldLabel htmlFor="confirm">Confirm password</FieldLabel>
                  <Input
                    id="confirm"
                    type="password"
                    autoComplete="new-password"
                    aria-invalid={!!errors.confirm}
                    {...register("confirm")}
                  />
                  {errors.confirm && (
                    <p className="text-xs font-medium text-destructive">
                      {errors.confirm.message}
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
                    {loading ? "Creating account…" : "Create account"}
                  </Button>
                  <FieldDescription className="text-center">
                    Already have an account?{" "}
                    <Link href="/login" className="text-accent hover:underline">
                      Sign in
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
