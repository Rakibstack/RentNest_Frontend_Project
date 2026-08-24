

"use server";

import { cookies } from "next/headers";

export async function getPaymentHistory() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/api/payments`,
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
        message: result.message || "Failed to load Payment History",
      };
    }

    return result;
  } catch (error) {
    console.error("Payment requests error:", error);

    return {
      success: false,
      data: [],
      message: "Something went wrong",
    };
  }
}