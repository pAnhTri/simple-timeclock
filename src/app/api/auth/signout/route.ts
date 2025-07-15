import { verifyToken } from "@/lib/utils";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PrismaClient } from "prisma/generated/prisma";

export const GET = async () => {
  const prisma = new PrismaClient();

  try {
    // Get the jti
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken");
    if (!refreshToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(refreshToken.value);
    if (!payload) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const jti = payload.jti;

    // Delete the token from the db
    await prisma.token.deleteMany({
      where: {
        jti,
      },
    });

    // Delete the refresh token
    cookieStore.delete("refreshToken");

    return NextResponse.json({ message: "Logged out" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
