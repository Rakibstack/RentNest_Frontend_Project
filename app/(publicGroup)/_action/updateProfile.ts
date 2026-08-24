"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

type UpdateProfilePayload = {
  name?: string;
  phone?: string;
  profileImage?: string;
};

export async function updateProfile(payload: UpdateProfilePayload) {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "You are not authenticated.",
      };
    }

    const response = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me/update`, {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },

      body: JSON.stringify(payload),

      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result?.message || "Failed to update profile.",
      };
    }

    // Invalidate cached profile data
    revalidateTag("my-profile",{expire: 0});

    // Revalidate profile page
    revalidatePath("/profile");
    return {
      success: true,
      message: result?.message || "Profile updated successfully.",
      data: result?.data,
    };
  } catch (error) {
    console.error("Update profile error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
