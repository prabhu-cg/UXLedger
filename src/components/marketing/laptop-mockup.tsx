import Image from "next/image";

/**
 * A MacBook-style frame around a real screenshot of the app (a 16:10 crop, so it is never stretched).
 * The lid, notch and base are drawn around it; light and dark captures swap with the theme.
 */
export function LaptopMockup({ src, darkSrc, alt }: { src: string; darkSrc: string; alt: string }) {
  const image = "object-cover object-top";
  return (
    <div className="mx-auto w-full max-w-[1040px]">
      <div className="relative rounded-t-[1.1rem] bg-[var(--charcoal)] p-[2.2%] ring-1 ring-foreground/20 sm:rounded-t-[1.6rem]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[0.35rem] bg-card sm:rounded-lg">
          <Image src={src} alt={alt} fill priority sizes="(min-width: 1088px) 1000px, 94vw" className={`${image} dark:hidden`} />
          <Image src={darkSrc} alt={alt} fill sizes="(min-width: 1088px) 1000px, 94vw" className={`${image} hidden dark:block`} />
          <span aria-hidden className="absolute top-0 left-1/2 h-[2.2%] min-h-1 w-[9%] -translate-x-1/2 rounded-b-[0.3rem] bg-[var(--charcoal)]" />
        </div>
      </div>
      <div
        aria-hidden="true"
        className="relative -ml-[5%] h-2.5 w-[110%] rounded-b-[1.4rem] bg-border-strong shadow-laptop sm:h-4"
      >
        <span className="absolute top-0 left-1/2 h-1 w-20 -translate-x-1/2 rounded-b-md bg-foreground/20 sm:h-1.5 sm:w-32" />
      </div>
    </div>
  );
}
