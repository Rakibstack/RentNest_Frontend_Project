"use server";

import { cookies } from "next/headers";
import { loginSchema } from "@/lib/validations/auth";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

export type LoginState = {
  success: boolean;
  message: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
};

export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const payload = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // Frontend/server-action validation
  const validation = loginSchema.safeParse(payload);

  if (!validation.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation.data),
        cache: "no-store",
      },
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Invalid email or password.",
      };
    }

    const { accessToken, refreshToken } = result.data;

    if (!accessToken || !refreshToken) {
      return {
        success: false,
        message: "Authentication failed. Please try again.",
      };
    }

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    const decodeToken = jwt.decode(accessToken) as JwtPayload;

    if (decodeToken.role === "TENANT") {
      redirect("/dashboard", "replace");
    } else if (decodeToken.role === "LANDLORD") {
      redirect("/landlord-dashboard", "replace");
    } else if (decodeToken.role === "ADMIN") {
      redirect("/admin-dashboard", "replace");
    }

    return {
      success: true,
      message: result.message || "Login successful.",
    };
 
}