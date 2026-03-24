import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sqdkqrvaessruhzrluvf.supabase.co";
const supabaseAnonKey =
  "sb_publishable_Bn_HNdLLyei7EAWPubaIkg_cPfkZwPf";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
