import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh flex flex-col">
      <div className="flex-1 flex">
        {/* Left brand panel */}
        <div
          className="hidden lg:flex lg:w-[58%] relative flex-col justify-between p-12 overflow-hidden"
          style={{ backgroundColor: "#C74504" }}
        >
          {/* Watermark logo mark */}
          <div className="absolute inset-y-0 right-0 translate-x-1/2 pointer-events-none select-none flex items-center">
            <svg
              viewBox="0 0 72 85"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-auto opacity-[0.15]"
            >
              <path
                d="M25.9393 59.9393C26.5251 59.3536 27.4746 59.3536 28.0604 59.9393C28.6462 60.5251 28.6462 61.4746 28.0604 62.0604L19.2675 70.8534C18.2912 71.8296 16.7086 71.8296 15.7323 70.8534L11.9393 67.0604C11.3536 66.4746 11.3536 65.5251 11.9393 64.9393C12.5251 64.3536 13.4746 64.3536 14.0604 64.9393L17.4999 68.3788L25.9393 59.9393ZM25.9393 43.9393C26.5251 43.3536 27.4746 43.3536 28.0604 43.9393C28.6462 44.5251 28.6462 45.4746 28.0604 46.0604L19.2675 54.8534C18.2912 55.8296 16.7086 55.8296 15.7323 54.8534L11.9393 51.0604C11.3536 50.4746 11.3536 49.5251 11.9393 48.9393C12.5251 48.3536 13.4746 48.3536 14.0604 48.9393L17.4999 52.3788L25.9393 43.9393ZM25.9393 27.4393C26.5251 26.8536 27.4746 26.8536 28.0604 27.4393C28.6462 28.0251 28.6462 28.9746 28.0604 29.5604L19.2675 38.3534C18.2912 39.3296 16.7086 39.3296 15.7323 38.3534L11.9393 34.5604C11.3536 33.9746 11.3536 33.0251 11.9393 32.4393C12.5251 31.8536 13.4746 31.8536 14.0604 32.4393L17.4999 35.8788L25.9393 27.4393Z"
                fill="white"
              />
              <path d="M59 64.75C60.1046 64.75 61 65.6454 61 66.75C61 67.8546 60.1046 68.75 59 68.75H35C33.8954 68.75 33 67.8546 33 66.75C33 65.6454 33.8954 64.75 35 64.75H59Z" fill="white" />
              <path d="M59 47.75C60.1046 47.75 61 48.6454 61 49.75C61 50.8546 60.1046 51.75 59 51.75H35C33.8954 51.75 33 50.8546 33 49.75C33 48.6454 33.8954 47.75 35 47.75H59Z" fill="white" />
              <path d="M59 30.75C60.1046 30.75 61 31.6454 61 32.75C61 33.8546 60.1046 34.75 59 34.75H35C33.8954 34.75 33 33.8546 33 32.75C33 31.6454 33.8954 30.75 35 30.75H59Z" fill="white" />
            </svg>
          </div>

          {/* Logo */}
          <div className="relative">
            <Link href="/">
              <Logo variant="light" showTagline={false} />
            </Link>
          </div>

          {/* Quote */}
          <div className="relative max-w-lg">
            <span
              aria-hidden="true"
              className="block text-white/15 leading-none select-none -ml-3 mb-0"
              style={{ fontSize: "10rem", lineHeight: 1 }}
            >
              &ldquo;
            </span>
            <blockquote className="text-white text-[1.6rem] font-semibold leading-snug -mt-6">
              Track what&apos;s broken, fix what matters, ship better experiences.
            </blockquote>
            <p className="text-white/60 text-sm mt-5 font-medium tracking-wide">
              — The UXLedger philosophy
            </p>
          </div>

          {/* Copyright */}
          <p className="relative text-white/40 text-xs">
            © {new Date().getFullYear()} UXLedger. All rights reserved.
          </p>
        </div>

        {/* Right form area */}
        <div
          className="flex-1 flex flex-col items-center justify-center px-6 py-8 sm:py-12"
          style={{ backgroundColor: "#FFFAEF" }}
        >
          <div className="w-full max-w-sm">
            {/* Logo above card */}
            <div className="flex flex-col items-center mb-6 sm:mb-8">
              <Link href="/">
                <Logo size="lg" layout="stack" showTagline taglineClassName="text-[14px]" />
              </Link>
            </div>
            {/* Card */}
            <div className="rounded-2xl border border-border bg-white p-7">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
