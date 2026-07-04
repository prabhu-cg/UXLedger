import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = { title: { absolute: "Signup - UXLedger" } };

export default function RegisterPage() {
  return (
    <>
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Create your account</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Start managing UX debt in minutes
        </p>
      </div>
      <RegisterForm />
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-medium hover:underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </>
  );
}
