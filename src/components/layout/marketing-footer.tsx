import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AboutContent, PrivacyContent, TermsContent } from "@/components/layout/legal-content";

export function MarketingFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-12 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <Link href="/">
          <Logo size="sm" showTagline={false} />
        </Link>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} UXLedger. Better experience, Lower debt.
        </p>
        <div className="flex items-center gap-5">
          <Dialog>
            <DialogTrigger className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              About
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>About UXLedger</DialogTitle>
              </DialogHeader>
              <AboutContent />
            </DialogContent>
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
