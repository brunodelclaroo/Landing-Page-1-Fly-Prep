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

  try {
    const supabase = getSupabaseClient();

    const { error: insertError } = await supabase.from("leads").insert({
      first_name: firstName,
      whatsapp,
    });

    if (insertError) {
      throw insertError;
    }

    notifyNewLead(firstName, whatsapp).catch(() => {});

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
