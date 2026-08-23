"use server";

import { cookies } from "next/headers";

export async function getMyRentalRequests() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/api/rentals`,
      {
        headers: {
         Cookie : `accessToken=${accessToken}`
        },
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        data: [],
        message: result.message || "Failed to load rental requests",
      };
    }

    return result;
  } catch (error) {
    console.error("Rental requests error:", error);

    return {
      success: false,
      data: [],
      message: "Something went wrong",
    };
  }
}