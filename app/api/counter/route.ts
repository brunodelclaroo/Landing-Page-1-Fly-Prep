import { NextResponse } from "next/server";
import { getSupabaseAdmin, FOUNDER_SPOTS_TOTAL } from "@/lib/supabase";

export const revalidate = 60;

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const { count } = await supabase
      .from("leads")
      .select("id", { count: "exact", head: true });

    const taken = Math.min(count ?? 0, FOUNDER_SPOTS_TOTAL);

    return NextResponse.json(
      { taken, total: FOUNDER_SPOTS_TOTAL },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30" } },
    );
  } catch {
    return NextResponse.json({ taken: 0, total: FOUNDER_SPOTS_TOTAL });
  }
}
