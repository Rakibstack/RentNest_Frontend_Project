"use server";

import { cookies } from "next/headers";

export const getAllProperties = async () => {
  try {
    const cookieStore = cookies();
    const accessToken = (await cookieStore).get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "User Not Logged In",
      };
    }

    const response = await fetch(
      `${process.env.BACKEND_API_URL}/api/admin/properties`,
      {
        headers: {
          Cookie: `accessToken=${accessToken}`,
        },

        next: {
          revalidate: 60,
        },
      },
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result?.message || "Failed to fetch properties",
        data: [],
      };
    }

    return result;
  } catch (error) {
    console.error("Get all properties error:", error);

    return {
      success: false,
      message: "Something went wrong",
      data: [],
    };
  }
};
