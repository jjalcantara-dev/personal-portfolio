import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const resend = new Resend(process.env.RESEND_API_KEY);

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "10 m"),
  prefix: "contact",
});

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function sanitize(str: string): string {
  return str.replace(/[\x00-\x1F\x7F]/g, "").replace(/\s+/g, " ").trim();
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const { success, reset } = await ratelimit.limit(ip);
  if (!success) {
    const retryAfter = Math.ceil((reset - Date.now()) / 1000);
    return NextResponse.json(
      { error: "rate_limited", retryAfter },
      { status: 429, headers: { "Retry-After": String(retryAfter) } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string"
  ) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }

  const cleanName = sanitize(name);
  const cleanEmail = email.trim().toLowerCase();
  const cleanMessage = sanitize(message);

  if (!cleanName || cleanName.length > MAX_NAME_LENGTH) {
    return NextResponse.json({ error: "invalid_name" }, { status: 400 });
  }
  if (
    !cleanEmail ||
    cleanEmail.length > MAX_EMAIL_LENGTH ||
    !emailRegex.test(cleanEmail)
  ) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (!cleanMessage || cleanMessage.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "invalid_message" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio <contact@jjalcantara.dev>",
    to: process.env.CONTACT_EMAIL!,
    replyTo: cleanEmail,
    subject: `Contacto de ${cleanName.substring(0, 50)} — jjalcantara.dev`,
    text: `Nombre: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`,
  });

  if (error) {
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
