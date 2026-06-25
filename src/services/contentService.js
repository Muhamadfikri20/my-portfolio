/**
 * contentService — CRUD layer over Supabase for portfolio content
 * (profile, projects, skills, articles).
 *
 * Read is public (RLS allows anon select). Writes require the admin
 * session (RLS `is_admin()` policy). Every method returns
 * `{ data, error }` so callers can surface toast feedback.
 *
 * Row ⇆ domain mapping lives here so views/stores stay clean.
 */
import { supabase } from '@/lib/supabase'

/* ─────────────── mappers: DB row → app shape ─────────────── */

export function projectFromRow(r) {
  return {
    id: r.id,
    title: r.title,
    description: r.description || '',
    category: r.category || '',
    technologies: r.technologies || [],
    status: r.status || '',
    year: r.year || '',
    highlights: r.highlights || [],
    links: { github: r.github_url || '', live: r.live_url || '' },
    sortOrder: r.sort_order ?? 0,
  }
}

export function articleFromRow(r) {
  return {
    id: r.id,
    title: r.title,
    excerpt: r.excerpt || '',
    category: r.category || '',
    readTime: r.read_time || '',
    publishDate: r.publish_date || '',
    tags: r.tags || [],
    views: r.views ?? 0,
    featured: !!r.featured,
    status: r.status || 'Draft',
    sortOrder: r.sort_order ?? 0,
  }
}

export function skillFromRow(r) {
  return { id: r.id, name: r.name, category: r.category, icon: r.icon || '', sortOrder: r.sort_order ?? 0 }
}

/* ─────────────── mappers: app shape → DB row ─────────────── */

function projectToRow(p) {
  return {
    title: p.title,
    description: p.description || null,
    category: p.category || null,
    technologies: normalizeArray(p.technologies),
    status: p.status || null,
    year: p.year || null,
    highlights: normalizeArray(p.highlights),
    github_url: p.links?.github || null,
    live_url: p.links?.live || null,
    sort_order: Number(p.sortOrder) || 0,
  }
}

function articleToRow(a) {
  return {
    title: a.title,
    excerpt: a.excerpt || null,
    category: a.category || null,
    read_time: a.readTime || null,
    publish_date: a.publishDate || null,
    tags: normalizeArray(a.tags),
    views: Number(a.views) || 0,
    featured: !!a.featured,
    status: a.status || 'Draft',
    sort_order: Number(a.sortOrder) || 0,
  }
}

function skillToRow(s) {
  return {
    name: s.name,
    category: s.category,
    icon: s.icon || null,
    sort_order: Number(s.sortOrder) || 0,
  }
}

/** Accept array OR comma-separated string → clean string[]. */
export function normalizeArray(v) {
  if (Array.isArray(v)) return v.map((x) => String(x).trim()).filter(Boolean)
  if (typeof v === 'string') return v.split(',').map((x) => x.trim()).filter(Boolean)
  return []
}

/* ─────────────────────── READ (bulk) ─────────────────────── */

export const contentService = {
  async fetchAll() {
    const [profile, projects, skills, articles] = await Promise.all([
      this.getProfile(),
      this.listProjects(),
      this.listSkills(),
      this.listArticles(),
    ])
    return { profile, projects, skills, articles }
  },

  async getProfile() {
    const { data, error } = await supabase.from('profile').select('*').eq('id', 1).maybeSingle()
    if (error) return { data: null, error }
    return { data, error: null }
  },

  async listProjects() {
    const { data, error } = await supabase
      .from('projects').select('*').order('sort_order', { ascending: true })
    return { data: (data || []).map(projectFromRow), error }
  },

  async listSkills() {
    const { data, error } = await supabase
      .from('skills').select('*').order('sort_order', { ascending: true })
    return { data: (data || []).map(skillFromRow), error }
  },

  async listArticles() {
    const { data, error } = await supabase
      .from('articles').select('*').order('sort_order', { ascending: true })
    return { data: (data || []).map(articleFromRow), error }
  },

  /* ───────────────────── WRITE: profile ───────────────────── */
  async updateProfile(p) {
    const row = {
      introduction: p.introduction,
      description: p.description,
      location: p.location,
      experience: p.experience,
      expertise: p.expertise,
      experiences: p.experiences || [],
      education: p.education || [],
      certifications: p.certifications || [],
    }
    const { data, error } = await supabase
      .from('profile').update(row).eq('id', 1).select().maybeSingle()
    return { data, error }
  },

  /* ───────────────────── WRITE: projects ──────────────────── */
  async saveProject(p) {
    const row = projectToRow(p)
    if (p.id) {
      const { data, error } = await supabase.from('projects').update(row).eq('id', p.id).select().single()
      return { data: data && projectFromRow(data), error }
    }
    const { data, error } = await supabase.from('projects').insert(row).select().single()
    return { data: data && projectFromRow(data), error }
  },
  async deleteProject(id) {
    const { error } = await supabase.from('projects').delete().eq('id', id)
    return { error }
  },

  /* ───────────────────── WRITE: skills ────────────────────── */
  async saveSkill(s) {
    const row = skillToRow(s)
    if (s.id) {
      const { data, error } = await supabase.from('skills').update(row).eq('id', s.id).select().single()
      return { data: data && skillFromRow(data), error }
    }
    const { data, error } = await supabase.from('skills').insert(row).select().single()
    return { data: data && skillFromRow(data), error }
  },
  async deleteSkill(id) {
    const { error } = await supabase.from('skills').delete().eq('id', id)
    return { error }
  },

  /* ───────────────────── WRITE: articles ──────────────────── */
  async saveArticle(a) {
    const row = articleToRow(a)
    if (a.id) {
      const { data, error } = await supabase.from('articles').update(row).eq('id', a.id).select().single()
      return { data: data && articleFromRow(data), error }
    }
    const { data, error } = await supabase.from('articles').insert(row).select().single()
    return { data: data && articleFromRow(data), error }
  },
  async deleteArticle(id) {
    const { error } = await supabase.from('articles').delete().eq('id', id)
    return { error }
  },
}
