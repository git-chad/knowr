import { createBrowserClient } from "@supabase/ssr";

export default function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

  return createBrowserClient(supabaseUrl, supabaseKey);
}
