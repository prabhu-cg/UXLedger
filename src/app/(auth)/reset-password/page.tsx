import type { Metadata } from "next";
import Link from "next/link";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = { title: "Reset password" };

export default function ResetPasswordPage() {
  return (
    <>
      <div className="mb-5">
        <h2 className="text-lg font-extrabold tracking-[-0.025em]">Reset your password</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Enter your email and we&apos;ll send you a reset link
        </p>
      </div>
      <ResetPasswordForm />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Remembered it?{" "}
        <Link href="/login" className="text-primary-text font-medium hover:underline underline-offset-4">
          Back to sign in
        </Link>
      </p>
    </>
  );
}
