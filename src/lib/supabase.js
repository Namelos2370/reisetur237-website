import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ── Auth helpers ──────────────────────────────────────────────────────────────
export const signUp = async (email, password, metadata) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: metadata }
  })
  return { data, error }
}

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// ── Candidat helpers ──────────────────────────────────────────────────────────
export const getCandidateProfile = async (userId) => {
  const { data, error } = await supabase
    .from('candidates')
    .select('*')
    .eq('user_id', userId)
    .single()
  return { data, error }
}

export const updateCandidateProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('candidates')
    .upsert({ user_id: userId, ...updates, updated_at: new Date().toISOString() })
  return { data, error }
}

// ── Documents helpers ─────────────────────────────────────────────────────────
export const uploadDocument = async (userId, file, docType) => {
  const ext = file.name.split('.').pop()
  const path = `${userId}/${docType}_${Date.now()}.${ext}`
  const { data, error } = await supabase.storage
    .from('candidate-documents')
    .upload(path, file)
  if (error) return { data: null, error }
  // Enregistrer en BDD
  const { data: record, error: dbError } = await supabase
    .from('documents')
    .insert({ user_id: userId, type: docType, path, name: file.name, status: 'pending' })
  return { data: record, error: dbError }
}

export const getCandidateDocuments = async (userId) => {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}

// ── Dossier visa helpers ──────────────────────────────────────────────────────
export const getVisaDossier = async (userId) => {
  const { data, error } = await supabase
    .from('visa_dossiers')
    .select('*, visa_steps(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  return { data, error }
}

// ── Messages helpers ──────────────────────────────────────────────────────────
export const getMessages = async (userId) => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('candidate_id', userId)
    .order('created_at', { ascending: true })
  return { data, error }
}

export const sendMessage = async (userId, content) => {
  const { data, error } = await supabase
    .from('messages')
    .insert({ candidate_id: userId, content, sender: 'candidate', read: false })
  return { data, error }
}
