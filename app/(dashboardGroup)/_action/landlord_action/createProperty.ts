
"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createProperty(data: {
  title: string;
  description: string;
  location: string;
  rent: number;
  bedRoom: number;
  bathRooms: number;
  categoryId: string;
  image: string[];
}) {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/api/landlord/properties`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`
        },
        body: JSON.stringify(data),
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to create property",
      };
    }

    revalidatePath("/landlord-dashboard/properties");

    return {
      success: true,
      message: "Property created successfully",
      data: result.data,
    };
  } catch (error) {
    console.error("Create property error:", error);

    return {
      success: false,
      message: "Something went wrong while creating property",
    };
  }
}