import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "UXLedger: Better experience, Lower debt";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = (weight: 400 | 800) =>
  readFile(join(process.cwd(), "src/app/fonts", `manrope-latin-${weight}-normal.woff`));

export default async function OpenGraphImage() {
  const [regular, extraBold] = await Promise.all([font(400), font(800)]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f2ea",
          padding: 80,
          fontFamily: "Manrope",
          color: "#333333",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 44, fontWeight: 800 }}>
          <svg width="52" height="61" viewBox="0 0 72 85" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M70.4639 21.3243C70.5448 21.4125 70.606 21.5082 70.649 21.6077C71.435 21.8772 72 22.6226 72 23.5V79C72 82.3137 69.3137 85 66 85H6C2.68629 85 0 82.3137 0 79V6C0 2.68629 2.68629 0 6 0H49.5996C50.1432 0 50.6362 0.21689 50.9967 0.568857C51.2592 0.565846 51.5274 0.666277 51.7372 0.895077L70.4639 21.3243ZM68.063 23C68.0219 23.1598 68 23.3274 68 23.5V79C68 80.1046 67.1046 81 66 81H6C4.89543 81 4 80.1046 4 79V6C4 4.89543 4.89543 4 6 4H49.5996C49.7367 4 49.8706 3.9862 50 3.95991V22C50 22.5523 50.4477 23 51 23H68.063Z"
              fill="#333333"
            />
            <path d="M33 66.75H61M33 49.75H61M33 32.75H61" stroke="#333333" strokeWidth="4" strokeLinecap="round" />
            <path d="M12.5 28.5l5 5 9-9M12.5 45l5 5 9-9M12.5 61.5l5 5 9-9" stroke="#C74504" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ display: "flex" }}>
            UX<span style={{ color: "#a93a03" }}>Ledger</span>
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3, display: "flex" }}>
            Track UX debt. Fix what matters.
          </div>
          <div style={{ fontSize: 34, color: "#5f5a54", display: "flex" }}>Better experience, Lower debt.</div>
        </div>
        <div style={{ height: 8, background: "#c74504", width: 200, borderRadius: 4, display: "flex" }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Manrope", data: regular, weight: 400, style: "normal" },
        { name: "Manrope", data: extraBold, weight: 800, style: "normal" },
      ],
    },
  );
}
