
"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type RentalRequestStatus = "ACTIVE" | "BLOCKED";

export async function updateUserStatus(
  userId: string,
  status: RentalRequestStatus
) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie : `accessToken=${accessToken}`

        },
        body: JSON.stringify({
          status,
        }),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to update rental request",
      };
    }

    revalidatePath("/admin-dashboard/users")

    return {
      success: true,
      message:
        status === "ACTIVE"
          ? "User Active successfully"
          : "User Blocked successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Update user status error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}