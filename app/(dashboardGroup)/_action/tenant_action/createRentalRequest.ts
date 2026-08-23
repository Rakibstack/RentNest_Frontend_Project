
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type CreateRentalRequestPayload = {
  propertyId: string;
  moveInDate: string;
  message?: string;
};

export async function createRentalRequest(
  data: CreateRentalRequestPayload
) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/api/rentals`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`
        },
        body: JSON.stringify({
          propertyId: data.propertyId,
          moveInDate: data.moveInDate,
          ...(data.message && {
            message: data.message,
          }),
        }),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to send rental request",
      };
    }

    revalidatePath("/dashboard/tenant/requests");

    return {
      success: true,
      message: "Rental request sent successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Create rental request error:", error);

    return {
      success: false,
      message: "Something went wrong while sending the request",
    };
  }
}