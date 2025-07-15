import { generateAccessToken, verifyToken } from "@/lib/utils/token";
import { JWTPayload } from "jose";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  // Get the refresh token from the cookies
  const refreshToken = request.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Verify the refresh token
  let payload: JWTPayload | null = null;

  try {
    payload = await verifyToken(refreshToken);
  } catch (error) {
    console.error("Error verifying refresh token:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!payload) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Use refresh token to generate a new access token
  const accessToken = await generateAccessToken(payload);

  // Store the new access token in a temporary cookie for hydration
  const response = NextResponse.next();
  response.cookies.set("accessToken", accessToken, {
    httpOnly: false,
    secure: false,
    maxAge: 60,
    path: "/",
  });

  return response;
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
};
