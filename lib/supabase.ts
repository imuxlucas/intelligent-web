import { createBrowserClient } from "@supabase/ssr"
import type { Design } from '@/lib/types';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default supabase

export const uploadDesign = async (design: Design) => {
  const { data, error } = await supabase.from('designs').insert(design)
  if (error) {
    console.error(error)
    throw error
  }
  return data
}

export const getDesigns = async () => {
  const { data: designs, error } = await supabase.from('designs').select().order('uploaded_at', { ascending: false })
  if (error) {
    console.error(error)
    throw error
  }
  return designs
}

export const uploadFile = async (file: File) => {
  const { data, error } = await supabase.storage.from('media').upload('public/' + file.name, file)
  if (error) {
    console.error(error)
    throw error
  }
  return data
}

export const getFileUrl = async (path: string) => {
  const { data } = await supabase.storage.from('media').getPublicUrl(path)
  return data.publicUrl
}
