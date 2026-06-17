import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://jrksryvwdckusrnmghvl.supabase.co'
const SUPABASE_KEY = 'sb_publishable_RgB6qZk5b1_H_pRZF8okvQ_bPv_ahPY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export type Album = {
  id: string
  name: string
  description: string | null
  cover_url: string | null
  created_at: string
}

export type Photo = {
  id: string
  album_id: string
  url: string
  storage_path: string | null
  created_at: string
}
