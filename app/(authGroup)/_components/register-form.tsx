"use client";

import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, Mail, User } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { registerAction, RegisterState } from "../_action/registerAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const initialState: RegisterState = {
  success: false,
  message: "",
};

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
      router.push("/login");
    } else {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="mb-7">
        <p className="mb-3 text-sm font-medium text-primary">Get started</p>

        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Create your account
        </h2>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Join RentNest and find your next place or list your property.
        </p>
      </div>

      <form action={formAction} className="space-y-5">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>

          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Rakib Hasan"
              required
              autoComplete="name"
              className="h-11 rounded-xl pl-10"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="register-email">Email address</Label>

          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="register-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="h-11 rounded-xl pl-10"
            />
          </div>
        </div>
        {/* Profile Image*/}
        <div className="space-y-2">
          <Label htmlFor="name">Profile Picture</Label>

          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="profile"
              name="profileImage"
              type="text"
              placeholder="your profile picture"
              autoComplete="profile"
              className="h-11 rounded-xl pl-10"
            />
          </div>
        </div>

        {/* Role */}
        <div className="space-y-3">
          <Label>Choose your role</Label>

          <RadioGroup
            defaultValue="TENANT"
            name="role"
            className="grid grid-cols-2 gap-3"
          >
            {/* Tenant */}
            <Label htmlFor="tenant" className="cursor-pointer">
              <div className="flex items-start gap-3 rounded-xl border border-border p-4 transition-colors hover:border-primary/40 hover:bg-primary/5 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                <RadioGroupItem value="TENANT" id="tenant" className="mt-0.5" />

                <div>
                  <p className="text-sm font-semibold">Tenant</p>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Find your next home
                  </p>
                </div>
              </div>
            </Label>

            {/* Landlord */}
            <Label htmlFor="landlord" className="cursor-pointer">
              <div className="flex items-start gap-3 rounded-xl border border-border p-4 transition-colors hover:border-primary/40 hover:bg-primary/5 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                <RadioGroupItem
                  value="LANDLORD"
                  id="landlord"
                  className="mt-0.5"
                />

                <div>
                  <p className="text-sm font-semibold">Landlord</p>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    List your properties
                  </p>
                </div>
              </div>
            </Label>
          </RadioGroup>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="register-password">Password</Label>

          <div className="relative">
            <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="register-password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              required
              autoComplete="new-password"
              className="h-11 rounded-xl px-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2">
          <Checkbox id="terms" className="mt-0.5" />

          <Label
            htmlFor="terms"
            className="cursor-pointer text-xs font-normal leading-5 text-muted-foreground"
          >
            I agree to the{" "}
            <Link
              href="/terms"
              className="font-medium text-foreground underline underline-offset-4"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-medium text-foreground underline underline-offset-4"
            >
              Privacy Policy
            </Link>
            .
          </Label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          className="h-11 w-full rounded-xl font-semibold"
        >
          {isPending ? "Creating account..." : "Create account"}
        </Button>
      </form>

      {/* Login */}
      <div className="my-7 flex items-center gap-4">
        <Separator className="flex-1" />

        <span className="text-xs text-muted-foreground">
          Already have an account?
        </span>

        <Separator className="flex-1" />
      </div>

      <Button
        asChild
        variant="outline"
        size="lg"
        className="h-11 w-full rounded-xl font-semibold"
      >
        <Link href="/login">Sign in instead</Link>
      </Button>
    </div>
  );
}
