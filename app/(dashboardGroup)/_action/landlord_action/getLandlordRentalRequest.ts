import { cookies } from "next/headers";

export const getLandlordRentalRequest = async () => {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User Not Logged In",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/landlord/requests/landlordsProperties`,
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
