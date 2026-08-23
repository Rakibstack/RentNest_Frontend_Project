import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtUtils } from "./utils/jwtUtils";
import { JwtPayload } from "jsonwebtoken";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = [
  "/",
  "/property",
  "/property/:propertyId",
  "/about",
  "/contact",
  "/login",
  "/register",
];
const protectedRoutes = [
  {
    path: "/dashboard",
    role: "TENANT",
  },
  {
    path: "/admin-dashboard",
    role: "ADMIN",
  },
  {
    path: "/landlord-dashboard",
    role: "LANDLORD",
  },
];
// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookieStore = await cookies();

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string)
    : null;

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string,
      )
    : null;

  let userRole = null;

  if (!decodedAccessToken?.success) {
    cookieStore.delete("accessToken");
  }
  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = (decodedAccessToken.data as JwtPayload).role;
  }

  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "TENANT") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else if (userRole === "LANDLORD") {
      return NextResponse.redirect(new URL("/landlord-dashboard", request.url));
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  if (!accessToken && !isPublicRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }
  const restrictedRoute = protectedRoutes.find((route) =>
    pathname.startsWith(route.path),
  );

  if(restrictedRoute && userRole !== restrictedRoute.role){
    return NextResponse.redirect(new URL('/unauthorized', request.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)",
  ],
};
