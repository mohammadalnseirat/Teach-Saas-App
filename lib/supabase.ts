import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

//! Create a supabase client:
export const createSupabaseClient = () => {
  return createClient(
    //! 1-Supabase url and anon key: env variables
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      async accessToken() {
        //! 2-Get the user's session token from the clerk auth
        return (await auth()).getToken();
      },
    }
  );
};
