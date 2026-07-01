import { NextRequest, NextResponse } from "next/server";
import { waitlistSchema } from "@/lib/schemas";
import { getSupabaseAdmin, FOUNDER_SPOTS_TOTAL } from "@/lib/supabase";
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
    const supabase = getSupabaseAdmin();

    const { error: insertError } = await supabase.from("leads").insert({
      first_name: firstName,
      whatsapp,
      source: "landing",
    });

    if (insertError) {
      throw insertError;
    }

    const { count } = await supabase
      .from("leads")
      .select("id", { count: "exact", head: true });

    notifyNewLead(firstName, whatsapp).catch(() => {});

    const taken = count ?? 0;
    return NextResponse.json({
      success: true,
      spotsRemaining: Math.max(FOUNDER_SPOTS_TOTAL - taken, 0),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
