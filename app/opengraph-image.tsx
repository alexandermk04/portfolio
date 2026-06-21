import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = "Alexander Kranz - Data Science Student in Hamburg";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#fbf7f0",
          color: "#2a2520",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#1d7a80",
          }}
        >
          {siteConfig.url.replace(/^https?:\/\//, "")}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 120,
            fontWeight: 800,
            lineHeight: 1,
            marginTop: 24,
            fontFamily: "Georgia, 'Times New Roman', serif",
            color: "#2a2520",
          }}
        >
          Alexander Kranz<span style={{ color: "#1d7a80" }}>.</span>
        </div>
        <div style={{ fontSize: 40, color: "#6e665b", marginTop: 28 }}>
          Data Science · Hamburg · Deutsche Bahn
        </div>
        <div
          style={{
            width: 120,
            height: 6,
            marginTop: 44,
            background: "#1d7a80",
            borderRadius: 3,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
