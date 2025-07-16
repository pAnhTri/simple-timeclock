import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "prisma/generated/prisma";

export async function POST(request: NextRequest) {
  const prisma = new PrismaClient();

  try {
    const { jti } = await request.json();

    if (!jti) {
      return NextResponse.json({ error: "JTI is required" }, { status: 400 });
    }

    const token = await prisma.token.findFirst({
      where: {
        jti,
      },
    });

    if (!token) {
      return NextResponse.json({ isInvalid: true }, { status: 200 });
    }

    return NextResponse.json({ isInvalid: false }, { status: 200 });
  } catch (error) {
    console.error("Error validating token:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
