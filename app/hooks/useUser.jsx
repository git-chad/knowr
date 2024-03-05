import createSupabaseClient from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = createSupabaseClient();
      const { data } = await supabase.auth.getSession();

      if (data.session?.user) {
        const { data: user } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.session.user.id)
          .single();
        return user;
      }
    },
  });
}
