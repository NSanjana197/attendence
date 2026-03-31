import { createClient } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto'

const supabaseUrl = "https://mnkqksvbtutuejihisvo.supabase.co"

const supabaseAnonKey = "sb_publishable_cpxh-OSFSjrg5J-cYLkW_g_9rNLH-jJ"

export const supabase = createClient(
supabaseUrl,
supabaseAnonKey,
{
auth:{
persistSession:true,
autoRefreshToken:true,
detectSessionInUrl:false
}
}
)