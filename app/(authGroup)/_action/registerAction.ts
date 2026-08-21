"use server";

import { registerSchema } from "@/lib/validations/auth";

export type RegisterState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    profileImage?: string[];
    password?: string[];
    confirmPassword?: string[];
    role?: string[];
  };
};

export async function registerAction(
  _prevState: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    profileImage: formData.get("profileImage") || undefined,
    password: formData.get("password"),
    role: formData.get("role"),
  };

  const validation = registerSchema.safeParse(payload);

  if (!validation.success) {
   
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/register`,
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
        message: result.message || "Unable to create your account.",
      };
    }

    return {
      success: true,
      message: result.message || "Account created successfully.",
    };
  } catch  {
    return {
      success: false,
      message: "Unable to connect to the server. Please try again.",
    };
  }
}
