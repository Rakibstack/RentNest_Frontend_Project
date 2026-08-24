"use server";

import { cookies } from "next/headers";

type CreateReviewPayload = {
  rentalRequestId: string;
  rating: number;
  comment?: string;
};

export async function createReview(payload: CreateReviewPayload) {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const response = await fetch(`${process.env.BACKEND_API_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const result = await response.json();

    console.log(result, "create review result");

    if (!response.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Failed to submit review.",
      };
    }

    return {
      success: true,
      message: result.message || "Review submitted successfully.",
      data: result.data,
    };
  } catch (error) {
    console.error("Create review error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
