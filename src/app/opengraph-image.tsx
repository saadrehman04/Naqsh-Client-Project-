import { ImageResponse } from "next/og";

export const alt = "Naqsh - Crafting Lasting Impressions";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
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
          backgroundColor: "#F7F1E7",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Subtle decorative inner border */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "1px solid rgba(192, 164, 142, 0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "24px",
            padding: "40px",
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontFamily: "serif",
              color: "#000000",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            NAQSH
          </div>

          <div
            style={{
              fontSize: 22,
              color: "#7F3021",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 600,
              display: "flex",
            }}
          >
            Crafting Lasting Impressions
          </div>

          <div
            style={{
              fontSize: 18,
              color: "#4D4E52",
              maxWidth: "600px",
              textAlign: "center",
              display: "flex",
            }}
          >
            Premium B2B Corporate Gifting in Pakistan · From Idea to Doorstep
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
