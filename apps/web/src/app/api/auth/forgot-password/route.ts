import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { createHmac } from "crypto";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";

/* 🔐 CREATE SECURE RESET TOKEN (JWT STYLE) */
function createResetToken(email: string): string {
  const secret = process.env.RESET_SECRET || "reset-secret";

  const header = Buffer.from(
    JSON.stringify({ alg: "HS256", typ: "JWT" })
  ).toString("base64url");

  const payload = Buffer.from(
    JSON.stringify({
      email,
      exp: Date.now() + 1000 * 60 * 60, // ⏱ 1 hour
    })
  ).toString("base64url");

  const signature = createHmac("sha256", secret)
    .update(`${header}.${payload}`)
    .digest("base64url");

  return `${header}.${payload}.${signature}`;
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 🔍 Find user (do NOT reveal if user exists)
    const users = await query<{ id: string; name: string }>(
      "SELECT id, name FROM users WHERE email = $1",
      [normalizedEmail]
    );

    if (users.length > 0) {
      const user = users[0];

      // 🔐 Generate token
      const token = createResetToken(normalizedEmail);

      const baseUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

      const resetUrl = `${baseUrl}/auth/reset-password?token=${token}`;

      // 📧 Create transporter
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },

        // ✅ FIX FOR YOUR ERROR
        tls: {
          rejectUnauthorized: false,
        },
      });

      // 📩 Send email
      await transporter.sendMail({
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
        to: normalizedEmail,
        subject: "Reset your AISprint password",
        html: `
          <div style="font-family:Arial,sans-serif;background:#f5f7fb;padding:40px;">
            <div style="max-width:600px;background:#fff;padding:40px;border-radius:10px;margin:auto;">
              
              <h2 style="margin-top:0;">Reset your password</h2>

              <p>Hi ${user.name},</p>

              <p>
                We received a request to reset your password.
                Click below to set a new password.
              </p>

              <p style="text-align:center;margin:30px 0;">
                <a href="${resetUrl}" 
                   style="background:#6366f1;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:600;">
                   Reset Password
                </a>
              </p>

              <p style="font-size:13px;color:#6b7280;">
                This link will expire in 1 hour.
              </p>

              <p style="font-size:13px;color:#6b7280;">
                If you didn’t request this, you can ignore this email.
              </p>

              <hr style="margin:20px 0;border:none;border-top:1px solid #eee;" />

              <p style="font-size:12px;color:#9ca3af;">
                AISprint Team
              </p>

            </div>
          </div>
        `,
      });
    }

    // 🔒 Always return success (security best practice)
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Forgot password error:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}