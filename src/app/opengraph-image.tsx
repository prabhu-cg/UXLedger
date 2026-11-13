import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "UXLedger: Better experience, Lower debt";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (file: string) => readFile(join(process.cwd(), "src/app/fonts", `${file}.woff`));

export default async function OpenGraphImage() {
  const [body, semibold, display] = await Promise.all([
    font("dm-sans-latin-400-normal"),
    font("dm-sans-latin-600-normal"),
    font("newsreader-latin-500-normal"),
  ]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fcfaf3",
          padding: 80,
          fontFamily: "DM Sans",
          color: "#353335",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 44, fontWeight: 600 }}>
          <svg width="52" height="61" viewBox="0 0 72 85" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M70.4639 21.3243C70.5448 21.4125 70.606 21.5082 70.649 21.6077C71.435 21.8772 72 22.6226 72 23.5V79C72 82.3137 69.3137 85 66 85H6C2.68629 85 0 82.3137 0 79V6C0 2.68629 2.68629 0 6 0H49.5996C50.1432 0 50.6362 0.21689 50.9967 0.568857C51.2592 0.565846 51.5274 0.666277 51.7372 0.895077L70.4639 21.3243ZM68.063 23C68.0219 23.1598 68 23.3274 68 23.5V79C68 80.1046 67.1046 81 66 81H6C4.89543 81 4 80.1046 4 79V6C4 4.89543 4.89543 4 6 4H49.5996C49.7367 4 49.8706 3.9862 50 3.95991V22C50 22.5523 50.4477 23 51 23H68.063Z"
              fill="#353335"
            />
            <path d="M33 66.75H61M33 49.75H61M33 32.75H61" stroke="#353335" strokeWidth="4" strokeLinecap="round" />
            <path d="M12.5 28.5l5 5 9-9M12.5 45l5 5 9-9M12.5 61.5l5 5 9-9" stroke="#e8b923" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ display: "flex" }}>
            UX<span style={{ color: "#826400" }}>Ledger</span>
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 88, fontFamily: "Newsreader", fontWeight: 500, lineHeight: 1.02, letterSpacing: -2, display: "flex" }}>
            Track UX debt. Fix what matters.
          </div>
          <div style={{ fontSize: 34, color: "#6b6b6b", display: "flex" }}>Better experience, Lower debt.</div>
        </div>
        <div style={{ height: 8, background: "#e8b923", width: 200, borderRadius: 4, display: "flex" }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "DM Sans", data: body, weight: 400, style: "normal" },
        { name: "DM Sans", data: semibold, weight: 600, style: "normal" },
        { name: "Newsreader", data: display, weight: 500, style: "normal" },
      ],
    },
  );
}
