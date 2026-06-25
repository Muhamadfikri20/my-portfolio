/**
 * content store — single source of truth for portfolio content.
 *
 * On load it pulls profile/projects/skills/articles from Supabase.
 * If the tables are empty or unreachable (schema not applied yet),
 * it transparently falls back to the bundled static data so the
 * site always renders. Admin CRUD actions write through to Supabase
 * and keep local state in sync, with toast feedback.
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { toast } from 'vue-sonner'
import { contentService, projectFromRow, skillFromRow, articleFromRow } from '@/services/contentService'
import { projects as staticProjects } from '@/data/projects'
import { skills as staticSkills } from '@/data/skills'
import { articles as staticArticles } from '@/data/articles'

const SKILL_CATEGORIES = ['backend', 'infrastructure', 'databases', 'tools']

/** Flatten the static skills map → row-like array for fallback. */
function flattenStaticSkills() {
  const out = []
  let id = -1
  for (const cat of SKILL_CATEGORIES) {
    ;(staticSkills[cat] || []).forEach((s, i) => {
      out.push({ id: id--, name: s.name, category: cat, icon: s.icon, sortOrder: i + 1 })
    })
  }
  return out
}

export const useContentStore = defineStore('content', () => {
  // ─── State ───
  const profile = ref(null)          // null until a DB row exists
  const projects = ref([])
  const skills = ref([])
  const articles = ref([])
  const isLoading = ref(true)
  const loaded = ref(false)
  const usingFallback = ref(false)   // true when DB empty / unreachable

  // ─── Getters ───
  const hasProfile = computed(() => !!profile.value)

  const skillsByCategory = computed(() => {
    const grouped = { backend: [], infrastructure: [], databases: [], tools: [] }
    for (const s of skills.value) {
      if (grouped[s.category]) grouped[s.category].push(s)
    }
    return grouped
  })

  const projectCategories = computed(() => {
    const set = new Set(projects.value.map((p) => p.category).filter(Boolean))
    return ['All', ...set]
  })

  const articleCategories = computed(() => {
    const set = new Set(articles.value.map((a) => a.category).filter(Boolean))
    return ['All', ...set]
  })

  const featuredArticles = computed(() => articles.value.filter((a) => a.featured))

  // ─── Load ───
  async function load() {
    isLoading.value = true
    try {
      const { profile: pf, projects: pj, skills: sk, articles: ar } = await contentService.fetchAll()

      const dbEmpty = !pf.data && !(pj.data?.length) && !(sk.data?.length) && !(ar.data?.length)
      const dbError = pf.error || pj.error || sk.error || ar.error

      if (dbEmpty || dbError) {
        // Fallback — schema not applied / network issue.
        usingFallback.value = true
        profile.value = null
        projects.value = staticProjects.map((p, i) => ({ ...p, sortOrder: i + 1 }))
        skills.value = flattenStaticSkills()
        articles.value = staticArticles.map((a, i) => ({ ...a, sortOrder: i + 1 }))
      } else {
        usingFallback.value = false
        profile.value = pf.data ? mapProfile(pf.data) : null
        projects.value = pj.data?.length ? pj.data : staticProjects.map((p, i) => ({ ...p, sortOrder: i + 1 }))
        skills.value = sk.data?.length ? sk.data : flattenStaticSkills()
        articles.value = ar.data?.length ? ar.data : staticArticles.map((a, i) => ({ ...a, sortOrder: i + 1 }))
      }
    } catch (e) {
      console.error('[content] load failed:', e)
      usingFallback.value = true
      projects.value = staticProjects.map((p, i) => ({ ...p, sortOrder: i + 1 }))
      skills.value = flattenStaticSkills()
      articles.value = staticArticles.map((a, i) => ({ ...a, sortOrder: i + 1 }))
    } finally {
      isLoading.value = false
      loaded.value = true
    }
  }

  function mapProfile(r) {
    return {
      introduction: r.introduction || '',
      description: r.description || '',
      location: r.location || '',
      experience: r.experience || '',
      expertise: r.expertise || '',
      experiences: r.experiences || [],
      education: r.education || [],
      certifications: r.certifications || [],
    }
  }

  function guardFallback() {
    if (usingFallback.value) {
      toast.error('Database belum siap. Jalankan supabase-schema.sql dulu, lalu reload.')
      return true
    }
    return false
  }

  // ─── CRUD: profile ───
  async function saveProfile(p) {
    if (guardFallback()) return false
    const { data, error } = await contentService.updateProfile(p)
    if (error) { toast.error(`Gagal menyimpan profil: ${error.message}`); return false }
    profile.value = mapProfile(data)
    toast.success('Profil tersimpan')
    return true
  }

  // ─── CRUD: projects ───
  async function saveProject(p) {
    if (guardFallback()) return false
    const { data, error } = await contentService.saveProject(p)
    if (error) { toast.error(`Gagal menyimpan project: ${error.message}`); return false }
    upsertLocal(projects, data)
    toast.success('Project tersimpan')
    return true
  }
  async function removeProject(id) {
    if (guardFallback()) return false
    const { error } = await contentService.deleteProject(id)
    if (error) { toast.error(`Gagal menghapus: ${error.message}`); return false }
    projects.value = projects.value.filter((x) => x.id !== id)
    toast.success('Project dihapus')
    return true
  }

  // ─── CRUD: skills ───
  async function saveSkill(s) {
    if (guardFallback()) return false
    const { data, error } = await contentService.saveSkill(s)
    if (error) { toast.error(`Gagal menyimpan skill: ${error.message}`); return false }
    upsertLocal(skills, data)
    toast.success('Skill tersimpan')
    return true
  }
  async function removeSkill(id) {
    if (guardFallback()) return false
    const { error } = await contentService.deleteSkill(id)
    if (error) { toast.error(`Gagal menghapus: ${error.message}`); return false }
    skills.value = skills.value.filter((x) => x.id !== id)
    toast.success('Skill dihapus')
    return true
  }

  // ─── CRUD: articles ───
  async function saveArticle(a) {
    if (guardFallback()) return false
    const { data, error } = await contentService.saveArticle(a)
    if (error) { toast.error(`Gagal menyimpan artikel: ${error.message}`); return false }
    upsertLocal(articles, data)
    toast.success('Artikel tersimpan')
    return true
  }
  async function removeArticle(id) {
    if (guardFallback()) return false
    const { error } = await contentService.deleteArticle(id)
    if (error) { toast.error(`Gagal menghapus: ${error.message}`); return false }
    articles.value = articles.value.filter((x) => x.id !== id)
    toast.success('Artikel dihapus')
    return true
  }

  /** Insert or replace an item in a ref<array> by id, keep sorted. */
  function upsertLocal(listRef, item) {
    if (!item) return
    const idx = listRef.value.findIndex((x) => x.id === item.id)
    if (idx >= 0) listRef.value.splice(idx, 1, item)
    else listRef.value.push(item)
    listRef.value.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
  }

  return {
    // state
    profile, projects, skills, articles, isLoading, loaded, usingFallback,
    // getters
    hasProfile, skillsByCategory, projectCategories, articleCategories, featuredArticles,
    // actions
    load, saveProfile,
    saveProject, removeProject,
    saveSkill, removeSkill,
    saveArticle, removeArticle,
  }
})

// re-export mappers for convenience
export { projectFromRow, skillFromRow, articleFromRow }
