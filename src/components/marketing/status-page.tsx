import { LogoMark } from "@/components/layout/logo-mark";

/**
 * Full-screen status page shared by 404, 500 and maintenance. The app's own mark stands in for the
 * first "0" of the status code and drifts inside a dashed halo. Plain markup only (no client hooks,
 * no router links) so it also works inside `global-error`, where the app layout is not mounted.
 */
export function StatusPage({
  eyebrow,
  code,
  title,
  description,
  actions,
  hint,
}: {
  eyebrow: string;
  code?: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
  hint?: React.ReactNode;
}) {
  const digits = (code ?? "").split("");
  const markAt = digits.indexOf("0");

  return (
    <main
      id="main-content"
      className="marketing status-wash relative flex min-h-svh items-center justify-center overflow-hidden px-6 py-12"
    >
      <div className="relative flex max-w-[30rem] flex-col items-center text-center">
        <span className="mb-7 inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-[0.6875rem] font-bold tracking-[0.08em] text-primary-text uppercase before:size-1.5 before:rounded-full before:bg-primary-text before:content-['']">
          {eyebrow}
        </span>

        <div className="mb-5 flex items-center justify-center gap-1" aria-hidden={code ? undefined : true}>
          {code ? (
            <span className="sr-only">{code}</span>
          ) : null}
          {code ? (
            digits.map((d, i) =>
              i === markAt ? (
                <MarkHalo key={i} />
              ) : (
                <span
                  key={i}
                  aria-hidden="true"
                  className="text-[clamp(5rem,22vw,8rem)] leading-none font-extrabold tracking-[-0.04em] text-foreground tabular-nums select-none"
                >
                  {d}
                </span>
              ),
            )
          ) : (
            <MarkHalo large />
          )}
        </div>

        <h1 className="mb-2.5 text-[1.375rem] leading-snug font-bold tracking-[-0.01em] text-balance">{title}</h1>
        <p className="mb-8 max-w-[26rem] text-[0.9375rem] leading-relaxed text-muted-foreground">{description}</p>

        {actions && <div className="flex flex-wrap justify-center gap-2.5">{actions}</div>}
        {hint && <p className="mt-9 text-xs text-muted-foreground">{hint}</p>}
      </div>
    </main>
  );
}

function MarkHalo({ large }: { large?: boolean }) {
  const size = large ? "size-[clamp(6rem,24vw,8.5rem)]" : "size-[clamp(4.25rem,15vw,6.5rem)]";
  return (
    <span aria-hidden="true" className={`relative -mx-1 flex shrink-0 items-center justify-center ${size}`}>
      <span className="absolute inset-0 rounded-full border-[1.5px] border-dashed border-border-strong" />
      <span className="drift absolute top-[0.4rem] -right-[0.2rem] size-2 rounded-full bg-success opacity-55 [animation-delay:0.3s]" />
      <span className="drift absolute bottom-[0.6rem] -left-[0.3rem] size-1.5 rounded-full bg-warning opacity-55 [animation-delay:0.6s]" />
      <LogoMark
        width={52}
        className="drift h-auto w-[55%] drop-shadow-[0_10px_14px_rgb(28_25_23/0.14)]"
      />
    </span>
  );
}
