import { generateAccessToken, verifyToken } from "@/lib/utils/token";
import { validateToken } from "@/lib/utils/api/auth";
import { JWTPayload } from "jose";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const originPath = request.nextUrl.pathname;
  const rootUrl = request.nextUrl.origin;

  // Get the refresh token from the cookies
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // If no refresh token and user is trying to access login page, allow it
  if (!refreshToken) {
    if (originPath === "/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Verify the refresh token
  let payload: JWTPayload | null = null;

  try {
    payload = await verifyToken(refreshToken);
  } catch (error) {
    console.error("Error verifying refresh token:", error);
    if (originPath === "/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!payload) {
    if (originPath === "/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check if the refresh token is invalid by calling the API route
  try {
    const { isInvalid } = await validateToken(rootUrl, payload.jti ?? "");

    if (isInvalid) {
      if (originPath === "/login") {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch (error) {
    console.error("Error validating token:", error);
    if (originPath === "/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Use refresh token to generate a new access token
  const accessToken = await generateAccessToken(payload);

  if (originPath === "/login") {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("accessToken", accessToken, {
      httpOnly: false,
      secure: false,
      maxAge: 60,
      path: "/",
    });
    return response;
  }

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
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
    "/login",
  ],
};
