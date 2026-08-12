import { createClient } from '@supabase/supabase-js';

const supabaseID = process.env.NEXT_PUBLIC_SUPABASE_ID!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseID, supabaseKey);