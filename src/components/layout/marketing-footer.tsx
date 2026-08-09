import Link from "next/link";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AboutContent, PrivacyContent, TermsContent } from "@/components/layout/legal-content";
import packageJson from "../../../package.json";

export function MarketingFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-12 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <Link href="/">
          <Logo size="sm" />
        </Link>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} UXLedger. Better experience, Lower debt.
        </p>
        <div className="flex items-center gap-5">
          <Dialog modal={false}>
            <DialogTrigger className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              About
            </DialogTrigger>
            <DialogPortal>
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
              <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[85vh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-hidden rounded-2xl border border-border bg-background shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
                <DialogHeader className="shrink-0 space-y-0 border-b border-border p-6 sm:p-8">
                  <div className="flex items-center gap-4">
                    <Logo iconOnly size="lg" />
                    <div className="flex flex-col gap-1">
                      <DialogTitle>About UXLedger</DialogTitle>
                      <p className="text-sm text-muted-foreground">Better experience, Lower debt</p>
                      <span className="mt-0.5 inline-flex w-fit items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        v{packageJson.version}
                      </span>
                    </div>
                  </div>
                </DialogHeader>
                <div className="min-h-0 overflow-y-auto p-6 sm:p-8">
                  <AboutContent />
                </div>
                <DialogClose className="absolute right-4 top-4 rounded-sm text-muted-foreground opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <X className="size-4" />
                  <span className="sr-only">Close</span>
                </DialogClose>
              </DialogPrimitive.Content>
            </DialogPortal>
          </Dialog>

          <Dialog>
            <DialogTrigger className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Privacy
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Privacy Policy</DialogTitle>
              </DialogHeader>
              <PrivacyContent />
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              Terms
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Terms of Service</DialogTitle>
              </DialogHeader>
              <TermsContent />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </footer>
  );
}
