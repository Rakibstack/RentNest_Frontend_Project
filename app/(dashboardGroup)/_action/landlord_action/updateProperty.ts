"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateProperty(
  propertyId: string,
  data: {
    title?: string;
    description?: string;
    location?: string;
    rent?: number;
    bedRoom?: number;
    bathRooms?: number;
    categoryId?: string;
    availability?: string;
  },
) {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`,
      {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },

        body: JSON.stringify(data),

        cache: "no-store",
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to update property",
      };
    }

    revalidatePath("/landlord-dashboard/properties");
    revalidatePath(`/properties/${propertyId}`);

    return {
      success: true,
      message: "Property updated successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Update property error:", error);

    return {
      success: false,
      message: "Something went wrong while updating property",
    };
  }
}
