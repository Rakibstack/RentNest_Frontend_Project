import { cookies } from "next/headers";

export const getMyProperties = async () => {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User Not Logged In",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/properties/myProperty/landord/me`,
    {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },

      cache: "force-cache",
      next: {
        revalidate: 60 * 60 *6,
        tags: ["my-properties"],
      },
    },
  );
   
   const result = await res.json()
   return result;
};
