import { ImageResponse } from "next/og";

export const alt = "Modexa — Technology built for modern businesses.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default Open Graph image: the Modexa monogram + wordmark on brand black. */
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
          background: "#05060b",
          backgroundImage:
            "radial-gradient(circle at 50% 20%, rgba(99,102,241,0.25), transparent 60%)",
        }}
      >
        <svg width="180" height="180" viewBox="0 0 512 512" fill="none">
          <defs>
            <linearGradient
              id="g"
              x1="132"
              y1="116"
              x2="380"
              y2="396"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#A855F7" />
              <stop offset="0.5" stopColor="#6366F1" />
              <stop offset="1" stopColor="#3FA2F7" />
            </linearGradient>
          </defs>
          <line
            x1="148"
            y1="132"
            x2="364"
            y2="380"
            stroke="url(#g)"
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
            color: "#f5f7fc",
          }}
        >
          MODEXA
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#9aa3b8",
          }}
        >
          Technology built for modern businesses.
        </div>
      </div>
    ),
    size
  );
}
