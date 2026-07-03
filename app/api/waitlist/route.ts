import { NextRequest, NextResponse } from "next/server";
import { waitlistSchema } from "@/lib/schemas";
import { getSupabaseClient } from "@/lib/supabase";
import { notifyNewLead } from "@/lib/resend";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const { success: withinLimit } = await checkRateLimit(ip);
  if (!withinLimit) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Try again later." },
      { status: 429 },
    );
  }

  const body = await req.json().catch(() => null);
  const parsed = waitlistSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const { firstName, whatsapp } = parsed.data;

  console.log("[waitlist] SUPABASE_URL:", process.env.SUPABASE_URL ?? "(not set)");
  console.log(
    "[waitlist] SUPABASE_ANON_KEY (first 10 chars):",
    process.env.SUPABASE_ANON_KEY ? process.env.SUPABASE_ANON_KEY.slice(0, 10) : "(not set)",
  );
  console.log("[waitlist] payload:", { firstName, whatsapp });

  try {
    const supabase = getSupabaseClient();

    const { data, error, status, statusText } = await supabase
      .from("leads")
      .insert({ first_name: firstName, whatsapp });

    console.log("[waitlist] Supabase response:", {
      data,
      error,
      status,
      statusText,
    });

    if (error) {
      throw error;
    }

    notifyNewLead(firstName, whatsapp).catch((err) => {
      console.error("[waitlist] notifyNewLead failed:", err);
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[waitlist] caught error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
