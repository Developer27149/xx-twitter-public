import { createClient } from '@supabase/supabase-js';

export const useSupabase = () => createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
