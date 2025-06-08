import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#171717",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="7" width="18" height="13" rx="2" fill="#171717" />
          <path
            d="M7 7V5a5 5 0 0 1 10 0v2"
            stroke="#171717"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="9" cy="17" r="1" fill="#171717" />
          <circle cx="15" cy="17" r="1" fill="#171717" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
