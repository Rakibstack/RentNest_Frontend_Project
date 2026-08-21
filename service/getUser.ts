
"use server";

import { cookies } from "next/headers";

export const getUser = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    return {
      success: false,
      message: "User Not Logged In",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },

   cache: 'force-cache',
   next: {
    revalidate: 60 * 60 * 24,
    tags: ['my-profile']
   }
  });

  const result = await res.json();
  return result;
};
