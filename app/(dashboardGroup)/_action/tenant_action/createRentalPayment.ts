"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createRentalPayment(rentalRequestId: string) {
  let checkoutUrl: string | undefined;
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
      `${process.env.BACKEND_API_URL}/api/payments/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}`,
        },
        body: JSON.stringify({ rentalRequestId }),
        cache: "no-store",
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Failed to create payment",
      };
    }
    checkoutUrl = result.data?.checkoutUrl;
   
  } catch (error) {
    console.error("Create rental payment error:", error);

    return {
      success: false,
      message: "Something went wrong while creating payment",
    };
  }

  redirect(checkoutUrl as string)
}
