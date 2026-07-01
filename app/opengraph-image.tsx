import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
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
          background: "#0A1024",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(27,48,123,0.55), transparent 55%), radial-gradient(circle at 75% 75%, rgba(247,115,53,0.35), transparent 55%)",
        }}
      >
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#F77335",
            marginBottom: 24,
            display: "flex",
          }}
        >
          Fly Prep
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
            textAlign: "center",
            padding: "0 80px",
            lineHeight: 1.1,
            display: "flex",
          }}
        >
          The SAT platform built for 1500+
        </div>
      </div>
    ),
    { ...size },
  );
}
