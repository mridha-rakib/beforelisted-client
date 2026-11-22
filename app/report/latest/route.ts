import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!base) return new NextResponse("Report unavailable", { status: 503, headers: { "Cache-Control": "no-store" } });
  try {
    const response = await fetch(`${base.replace(/\/$/, "")}/monthly-reports/latest`, { cache: "no-store" });
    if (response.status === 404) return new NextResponse("Report not found", { status: 404, headers: { "Cache-Control": "no-store" } });
    if (!response.ok) return new NextResponse("Report unavailable", { status: 503, headers: { "Cache-Control": "no-store" } });
    const data = await response.json();
    const link = data?.data?.link;
    if (typeof link !== "string") throw new Error("Invalid report link");
    const match = /^https:\/\/beforelisted\.com\/Market-Reports\/([^/?#]+)$/.exec(link);
    if (!match) throw new Error("Invalid report link");
    const filename = decodeURIComponent(match[1]);
    const url = new URL(link);
    if (url.hostname !== "beforelisted.com" || url.port || url.username || url.password
      || url.pathname !== `/Market-Reports/${match[1]}`
      || !/^[^/\\%?#]+\.pdf$/i.test(filename) || filename.includes("..")
      || [...filename].some(char => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127)) throw new Error("Invalid report link");
    return NextResponse.redirect(url, { status: 302, headers: { "Cache-Control": "no-store" } });
  } catch {
    return new NextResponse("Report unavailable", { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
