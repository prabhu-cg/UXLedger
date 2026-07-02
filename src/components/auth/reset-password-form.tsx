"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { resetPasswordSchema, type ResetPasswordInput } from "@/lib/validations/auth";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function ResetPasswordForm() {
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: "" },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: ResetPasswordInput) {
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${window.location.origin}/reset-password/update`,
    });
    if (error) {
      toast({ variant: "destructive", title: "Error", description: error.message });
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="text-center py-8">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
        <h2 className="text-lg font-semibold mb-2">Check your email</h2>
        <p className="text-sm text-muted-foreground">
          We sent a password reset link to{" "}
          <strong>{form.getValues("email")}</strong>
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@company.com" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-2" disabled={isSubmitting} size="lg">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send reset link
        </Button>
      </form>
    </Form>
  );
}
