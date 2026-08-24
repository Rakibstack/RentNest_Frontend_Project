"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type RentalRequestStatus = "APPROVED" | "REJECTED";

export async function updateRentalRequestStatus(
  requestId: string,
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
      `${process.env.BACKEND_API_URL}/api/landlord/requests/${requestId}`,
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

    revalidatePath("/landlord-dashboard/requests");
    revalidatePath("/dashboard/tenant/requests");

    return {
      success: true,
      message:
        status === "APPROVED"
          ? "Rental request approved successfully"
          : "Rental request rejected successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Update rental request status error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
}