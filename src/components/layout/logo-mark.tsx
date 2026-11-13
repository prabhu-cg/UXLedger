import { cn } from "@/lib/utils";

/** The UXLedger mark: a checked-off ledger page. `auto` follows the ink token so it works on both themes. */
export function LogoMark({
  variant = "auto",
  width = 36,
  height,
  className,
}: {
  variant?: "light" | "dark" | "auto";
  width?: number;
  height?: number;
  className?: string;
}) {
  const markColor = variant === "light" ? "#ffffff" : "var(--brand-ink)";
  // On the "light" variant the mark sits on an orange brand background,
  // so the checkmark accent must be white to stay visible against it.
  const checkmarkColor = variant === "light" ? "#ffffff" : "var(--primary)";

  return (
    <svg
      width={width}
      height={height ?? Math.round(width * 1.18)}
      viewBox="0 0 72 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn(variant === "auto" && "[--mark-color:var(--brand-ink)]", className)}
    >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M70.4639 21.3243C70.5448 21.4125 70.606 21.5082 70.649 21.6077C71.435 21.8772 72 22.6226 72 23.5V79C72 82.3137 69.3137 85 66 85H6C2.68629 85 0 82.3137 0 79V6C0 2.68629 2.68629 0 6 0H49.5996C50.1432 0 50.6362 0.21689 50.9967 0.568857C51.2592 0.565846 51.5274 0.666277 51.7372 0.895077L70.4639 21.3243ZM68.063 23C68.0219 23.1598 68 23.3274 68 23.5V79C68 80.1046 67.1046 81 66 81H6C4.89543 81 4 80.1046 4 79V6C4 4.89543 4.89543 4 6 4H49.5996C49.7367 4 49.8706 3.9862 50 3.95991V22C50 22.5523 50.4477 23 51 23H68.063Z"
          fill={variant === "auto" ? "var(--mark-color, var(--brand-ink))" : markColor}
        />
        <path
          d="M25.9393 59.9393C26.5251 59.3536 27.4746 59.3536 28.0604 59.9393C28.6462 60.5251 28.6462 61.4746 28.0604 62.0604L19.2675 70.8534C18.2912 71.8296 16.7086 71.8296 15.7323 70.8534L11.9393 67.0604C11.3536 66.4746 11.3536 65.5251 11.9393 64.9393C12.5251 64.3536 13.4746 64.3536 14.0604 64.9393L17.4999 68.3788L25.9393 59.9393ZM25.9393 43.9393C26.5251 43.3536 27.4746 43.3536 28.0604 43.9393C28.6462 44.5251 28.6462 45.4746 28.0604 46.0604L19.2675 54.8534C18.2912 55.8296 16.7086 55.8296 15.7323 54.8534L11.9393 51.0604C11.3536 50.4746 11.3536 49.5251 11.9393 48.9393C12.5251 48.3536 13.4746 48.3536 14.0604 48.9393L17.4999 52.3788L25.9393 43.9393ZM25.9393 27.4393C26.5251 26.8536 27.4746 26.8536 28.0604 27.4393C28.6462 28.0251 28.6462 28.9746 28.0604 29.5604L19.2675 38.3534C18.2912 39.3296 16.7086 39.3296 15.7323 38.3534L11.9393 34.5604C11.3536 33.9746 11.3536 33.0251 11.9393 32.4393C12.5251 31.8536 13.4746 31.8536 14.0604 32.4393L17.4999 35.8788L25.9393 27.4393Z"
          fill={checkmarkColor}
        />
        <path d="M59 64.75C60.1046 64.75 61 65.6454 61 66.75C61 67.8546 60.1046 68.75 59 68.75H35C33.8954 68.75 33 67.8546 33 66.75C33 65.6454 33.8954 64.75 35 64.75H59Z" fill={variant === "auto" ? "var(--mark-color, var(--brand-ink))" : markColor} />
        <path d="M59 47.75C60.1046 47.75 61 48.6454 61 49.75C61 50.8546 60.1046 51.75 59 51.75H35C33.8954 51.75 33 50.8546 33 49.75C33 48.6454 33.8954 47.75 35 47.75H59Z" fill={variant === "auto" ? "var(--mark-color, var(--brand-ink))" : markColor} />
        <path d="M59 30.75C60.1046 30.75 61 31.6454 61 32.75C61 33.8546 60.1046 34.75 59 34.75H35C33.8954 34.75 33 33.8546 33 32.75C33 31.6454 33.8954 30.75 35 30.75H59Z" fill={variant === "auto" ? "var(--mark-color, var(--brand-ink))" : markColor} />
    </svg>
  );
}
