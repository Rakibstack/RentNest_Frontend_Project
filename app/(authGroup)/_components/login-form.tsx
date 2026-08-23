"use client";

import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { loginAction, LoginState } from "../_action/authAction";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

const initialState: LoginState = {
  success: false,
  message: "",
};
export default function LoginForm() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') as string
  
  const [showPassword, setShowPassword] = useState(false);
  const [state,fromAction,pending] = useActionState(loginAction.bind(null,redirectTo),initialState)

  useEffect(() => {
  if (!state.message) return;

  if (state.success) {
    toast.success(state.message);
  } else {
    toast.error(state.message);
  }
}, [state]);

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="mb-8">
        <p className="mb-3 text-sm font-medium text-primary">
          Welcome back
        </p>

        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Sign in to RentNest
        </h2>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Welcome back! Please enter your details to continue.
        </p>
      </div>

      {/* Form */}
      <form action={fromAction} className="space-y-5">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>

          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="h-11 rounded-xl pl-10"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>

            <Link
              href="#"
              className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              className="h-11 rounded-xl px-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        {/* Remember */}
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />

          <Label
            htmlFor="remember"
            className="cursor-pointer text-sm font-normal text-muted-foreground"
          >
            Remember me for 30 days
          </Label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          className="h-11 w-full rounded-xl font-semibold"
        >
          {
            pending ? "Signing in..." : "Sign in"
          }
        </Button>
      </form>

      {/* Divider */}
      <div className="my-7 flex items-center gap-4">
        <Separator className="flex-1" />

        <span className="text-xs text-muted-foreground">
          New to RentNest?
        </span>

        <Separator className="flex-1" />
      </div>

      {/* Register */}
      <Button
        asChild
        variant="outline"
        size="lg"
        className="h-11 w-full rounded-xl font-semibold"
      >
        <Link href="/register">
          Create an account
        </Link>
      </Button>

      {/* Terms */}
      <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
        By continuing, you agree to our{" "}
        <Link
          href="#"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Terms
        </Link>{" "}
        and{" "}
        <Link
          href="#"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}