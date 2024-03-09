import { createBrowserClient } from "@supabase/ssr";

export default function createSupabaseClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
