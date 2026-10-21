import { ImageResponse } from "next/og";

export const alt = "Modexa — Websites, business software, automation and Modexa POS.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default Open Graph image: the Modexa monogram + wordmark on brand midnight. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
          background: "#0b1220",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 512 512" fill="none">
          <line
            x1="148"
            y1="132"
            x2="364"
            y2="380"
            stroke="#06B6D4"
            strokeWidth="64"
            strokeLinecap="round"
          />
          <line
            x1="364"
            y1="132"
            x2="148"
            y2="380"
            stroke="#FFFFFF"
            strokeWidth="64"
            strokeLinecap="round"
          />
        </svg>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: 18,
            color: "#ffffff",
          }}
        >
          MODEXA
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#e7edf3",
          }}
        >
          Websites · Business software · Automation · Modexa POS
        </div>
      </div>
    ),
    size
  );
}
