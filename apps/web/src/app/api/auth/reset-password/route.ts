import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { createHmac } from "crypto";

export const dynamic = "force-dynamic";

/* 🔐 VERIFY TOKEN (FIXED) */
function verifyToken(token: string): string | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [header, payload, signature] = parts;

    const secret = process.env.RESET_SECRET || "reset-secret";

    // ✅ Recreate signature
    const expectedSignature = createHmac("sha256", secret)
      .update(`${header}.${payload}`)
      .digest("base64url");

    // ❌ Invalid signature
    if (signature !== expectedSignature) return null;

    // ✅ Decode payload
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString()
    );

    // ❌ Expired token
    if (!data.exp || Date.now() > data.exp) return null;

    return data.email || null;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

/* 🚀 RESET PASSWORD */
export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    // ❌ Validate input
    if (!token || !password) {
      return NextResponse.json(
        { success: false, message: "Invalid request" },
        { status: 400 }
      );
    }

    // 🔐 Verify token
    const email = verifyToken(token);

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 400 }
      );
    }

    // 🔒 Hash password
    const hashedPassword = await hashPassword(password);

    // 🧠 Update DB
    await query(
      `UPDATE users 
       SET password_hash = $1 
       WHERE email = $2`,
      [hashedPassword, email]
    );

    // ✅ Success
    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (error) {
    console.error("Reset password error:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}