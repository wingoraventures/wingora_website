import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Null when env vars are missing so the site still renders in local previews.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;
