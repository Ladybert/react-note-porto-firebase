import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mrhknfperouxikhjdvum.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yaGtuZnBlcm91eGlraGpkdnVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3NzU1NDAsImV4cCI6MjA2MjM1MTU0MH0.kSdWhllQt2dpVe6nbv2VywrOcgr2IAwuH5YHxDH4FsM'

export const supabase = createClient(supabaseUrl, supabaseKey)