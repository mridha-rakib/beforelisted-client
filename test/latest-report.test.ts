import assert from "node:assert/strict";
import { test } from "node:test";

import { GET } from "../app/report/latest/route";

test("latest report redirects without caching and handles missing or invalid results", async () => {
  const previousFetch = globalThis.fetch;
  const previousBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  process.env.NEXT_PUBLIC_API_BASE_URL = "http://127.0.0.1:1/api/v1";
  try {
    globalThis.fetch = async () => Response.json({ data: { link: "https://beforelisted.com/Market-Reports/report.pdf" } });
    const response = await GET();
    assert.equal(response.status, 302);
    assert.equal(response.headers.get("location"), "https://beforelisted.com/Market-Reports/report.pdf");
    assert.equal(response.headers.get("cache-control"), "no-store");
    globalThis.fetch = async () => new Response(null, { status: 404 });
    assert.equal((await GET()).status, 404);
    for (const link of ["javascript:alert(1)", "http://beforelisted.com/Market-Reports/a.pdf", "https://www.beforelisted.com/Market-Reports/a.pdf", "https://beforelisted.com.evil.invalid/Market-Reports/a.pdf", "https://user@beforelisted.com/Market-Reports/a.pdf", "https://beforelisted.com:8443/Market-Reports/a.pdf", "https://beforelisted.com/Market-Reports/../a.pdf", "https://beforelisted.com/Market-Reports/%2e%2e%2fa.pdf", "https://beforelisted.com/Market-Reports/%252e%252e.pdf", "https://beforelisted.com/Market-Reports/a%5cb.pdf", "https://beforelisted.com/Market-Reports/a.pdf?x=1", "https://beforelisted.com/Market-Reports/a.pdf#x", "https://beforelisted.com/Market-Reports/a.html", "https://beforelisted.com/report/latest"]) {
      globalThis.fetch = async () => Response.json({ data: { link } });
      const rejected = await GET();
      assert.equal(rejected.status, 503, link);
      assert.equal(rejected.headers.get("cache-control"), "no-store");
    }
  } finally {
    globalThis.fetch = previousFetch;
    if (previousBase === undefined) delete process.env.NEXT_PUBLIC_API_BASE_URL;
    else process.env.NEXT_PUBLIC_API_BASE_URL = previousBase;
  }
});
