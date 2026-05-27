// ── À remplir avec tes clés Supabase (étape 2) ──
const SUPABASE_URL = 'REMPLACE_PAR_TON_URL'
const SUPABASE_KEY = 'REMPLACE_PAR_TA_CLE_ANON'
const BUCKET_NAME  = 'photos'

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
