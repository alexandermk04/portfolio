import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = "Alexander Kranz – Data Science Student in Hamburg";
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
          background:
            "radial-gradient(120% 120% at 100% 0%, #f6ead4 0%, #fbf7f0 55%)",
          color: "#2a2520",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#6b8f5e",
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
            backgroundImage:
              "linear-gradient(100deg, #e0a458 0%, #6b8f5e 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Alexander Kranz
        </div>
        <div style={{ fontSize: 40, color: "#6e665b", marginTop: 28 }}>
          Data Science · Hamburg · Deutsche Bahn
        </div>
      </div>
    ),
    { ...size },
  );
}
