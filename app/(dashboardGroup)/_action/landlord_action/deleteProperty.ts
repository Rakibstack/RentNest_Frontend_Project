
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function deleteProperty(propertyId: string) {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/api/landlord/properties/${propertyId}`,
      {
        method: "DELETE",

        headers: {
          Cookie: `accessToken=${accessToken}`,
        },

        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to delete property",
      };
    }

    revalidatePath("/landlord-dashboard/properties");
    revalidatePath(`/properties/${propertyId}`);

    return {
      success: true,
      message: "Property deleted successfully",
    };
  } catch (error) {
    console.error("Delete property error:", error);

    return {
      success: false,
      message: "Something went wrong while deleting property",
    };
  }
}