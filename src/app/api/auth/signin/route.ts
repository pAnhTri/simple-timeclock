import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "prisma/generated/prisma";
import { compareSync } from "bcrypt-ts";
import { generateAccessToken, generateRefreshToken } from "@/lib/utils/token";
import { cookies } from "next/headers";
import { loginValidator } from "@/lib/validators";

export const POST = async (
  req: NextRequest
): Promise<NextResponse<{ accessToken: string } | { message: string }>> => {
  const prisma = new PrismaClient();

  try {
    const { email, password } = await req.json();

    const validated = loginValidator.safeParse({ email, password });

    if (!validated.success) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Find the employee by email
    const employee = await prisma.employee.findUnique({
      where: {
        email,
      },
    });

    if (!employee) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }

    // Compare the password
    const isPasswordValid = compareSync(password, employee.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    const tokenPayload = {
      id: employee.id,
      email: employee.email,
      role: employee.role,
    };

    const accessToken = await generateAccessToken(tokenPayload);

    const { token: refreshToken, jti: refreshTokenJti } =
      await generateRefreshToken(tokenPayload);

    if (refreshTokenJti) {
      // Save JTI to the db
      await prisma.token.create({
        data: {
          jti: refreshTokenJti,
        },
      });
    }

    const cookieStore = await cookies();

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return NextResponse.json({ accessToken }, { status: 200 });
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
