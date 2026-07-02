import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <>
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Sign in</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Enter your email and password to access your account
        </p>
      </div>
      <LoginForm />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-primary font-medium hover:underline underline-offset-4">
          Create one
        </Link>
      </p>
    </>
  );
}
