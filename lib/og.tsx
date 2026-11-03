import "server-only";
import fs from "node:fs";
import { ImageResponse } from "next/og";
import { findMark, findVideo, publicFile, type MarkName } from "./assets";

export const OG_SIZE = { width: 1200, height: 630 };

const dataUri = (urlPath: string) => {
  const ext = urlPath.split(".").pop()!.toLowerCase();
  const mime = ext === "png" ? "image/png" : ext === "svg" ? "image/svg+xml" : "image/jpeg";
  return `data:${mime};base64,${fs.readFileSync(publicFile(urlPath)).toString("base64")}`;
};

/** Poster frame (or flat navy) with the crest bottom-right. */
export function ogImage(video: "HOME-V01" | "TRI-V01", mark: MarkName, navy: string, title: string) {
  const poster = findVideo(video).poster;
  const crest = findMark(mark);
  const posterOk = poster && /\.(jpe?g|png)$/i.test(poster);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: navy }}>
        {posterOk && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={dataUri(poster!)} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, objectFit: "cover" }} />
        )}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,22,44,.2), rgba(10,22,44,.85))" }} />
        <div style={{ position: "absolute", left: 64, bottom: 64, right: 320, display: "flex", color: "#fff", fontSize: 64, fontWeight: 800, lineHeight: 1.05, letterSpacing: -1 }}>
          {title}
        </div>
        {crest && !crest.endsWith(".svg") && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={dataUri(crest)} alt="" width={200} height={200} style={{ position: "absolute", right: 56, bottom: 56, borderRadius: 100, background: "#fff" }} />
        )}
      </div>
    ),
    OG_SIZE,
  );
}
