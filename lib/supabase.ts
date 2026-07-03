import { createClient } from "@supabase/supabase-js";

// Normalize to just the project origin (protocol + host), stripping any
// accidental /rest/v1, trailing slash, or other path the env var might
// contain — createClient appends /rest/v1 itself and errors (PGRST125)
// if the base URL already has a path.
function normalizeSupabaseUrl(rawUrl: string): string {
  const parsed = new URL(rawUrl);
  return `${parsed.protocol}//${parsed.host}`;
}

export function getSupabaseClient() {
  const rawUrl = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!rawUrl || !key) {
    throw new Error("Missing Supabase environment variables");
  }

  const url = normalizeSupabaseUrl(rawUrl);

  if (url !== rawUrl) {
    console.log("[supabase] Normalized SUPABASE_URL from", rawUrl, "to", url);
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
