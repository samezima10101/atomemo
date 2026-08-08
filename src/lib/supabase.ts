import { createClient } from '@supabase/supabase-js';

// 環境変数が読み込まれていない場合の型エラーを防ぐため ! をつける
const supabaseID = process.env.NEXT_PUBLIC_SUPABASE_ID!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseID, supabaseKey);