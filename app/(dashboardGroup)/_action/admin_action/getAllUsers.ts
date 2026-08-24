import { cookies } from "next/headers";

export const getAllUsers = async () => {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User Not Logged In",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/admin/users`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },

      next: {
        revalidate: 60,
      },
    },
  );

  const result = await res.json();
  return result;
};
