<script setup>
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import {
  LayoutDashboard, User, Briefcase, Code2, BookOpen,
  Plus, Pencil, Trash2, AlertTriangle, Save, Database,
} from 'lucide-vue-next'
import { useContentStore } from '@/stores/content'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'
import RecordModal from '@/components/admin/RecordModal.vue'

const content = useContentStore()
const { profile, projects, skills, articles, usingFallback, isLoading } = storeToRefs(content)

const tabs = [
  { id: 'profile', label: 'Profil', icon: User },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Code2 },
  { id: 'articles', label: 'Articles', icon: BookOpen },
]
const activeTab = ref('projects')

/* ─── modal state ─── */
const modalOpen = ref(false)
const modalTitle = ref('')
const modalFields = ref([])
const modalRecord = ref({})
const saving = ref(false)
let modalKind = ''

const PROJECT_FIELDS = [
  { key: 'title', label: 'Judul', type: 'text' },
  { key: 'category', label: 'Kategori', type: 'text' },
  { key: 'status', label: 'Status', type: 'select', options: ['Production', 'Open Source', 'Prototype', 'In Progress', 'Archived'] },
  { key: 'year', label: 'Tahun', type: 'text' },
  { key: 'sortOrder', label: 'Urutan', type: 'number' },
  { key: 'description', label: 'Deskripsi', type: 'textarea' },
  { key: 'technologies', label: 'Teknologi', type: 'list', hint: 'Pisahkan dengan koma' },
  { key: 'highlights', label: 'Highlights', type: 'list', hint: 'Pisahkan dengan koma' },
  { key: 'github', label: 'GitHub URL', type: 'text' },
  { key: 'live', label: 'Live URL', type: 'text' },
]
const SKILL_FIELDS = [
  { key: 'name', label: 'Nama', type: 'text' },
  { key: 'category', label: 'Kategori', type: 'select', options: ['backend', 'infrastructure', 'databases', 'tools'] },
  { key: 'icon', label: 'Icon path', type: 'text', placeholder: '/assets/icons/tech/...' },
  { key: 'sortOrder', label: 'Urutan', type: 'number' },
]
const ARTICLE_FIELDS = [
  { key: 'title', label: 'Judul', type: 'text' },
  { key: 'category', label: 'Kategori', type: 'text' },
  { key: 'status', label: 'Status', type: 'select', options: ['Published', 'Draft'] },
  { key: 'readTime', label: 'Waktu baca', type: 'text', placeholder: '12 min read' },
  { key: 'publishDate', label: 'Tanggal terbit', type: 'text', placeholder: 'YYYY-MM-DD' },
  { key: 'views', label: 'Views', type: 'number' },
  { key: 'sortOrder', label: 'Urutan', type: 'number' },
  { key: 'featured', label: 'Featured', type: 'checkbox', placeholder: 'Tampilkan sebagai unggulan' },
  { key: 'excerpt', label: 'Ringkasan', type: 'textarea' },
  { key: 'tags', label: 'Tags', type: 'list', hint: 'Pisahkan dengan koma' },
]

function openCreate(kind) {
  modalKind = kind
  if (kind === 'projects') { modalTitle.value = 'Tambah Project'; modalFields.value = PROJECT_FIELDS; modalRecord.value = { sortOrder: projects.value.length + 1, status: 'Production' } }
  if (kind === 'skills') { modalTitle.value = 'Tambah Skill'; modalFields.value = SKILL_FIELDS; modalRecord.value = { category: 'backend', sortOrder: skills.value.length + 1 } }
  if (kind === 'articles') { modalTitle.value = 'Tambah Artikel'; modalFields.value = ARTICLE_FIELDS; modalRecord.value = { status: 'Draft', featured: false, views: 0, sortOrder: articles.value.length + 1 } }
  modalOpen.value = true
}

function openEdit(kind, row) {
  modalKind = kind
  if (kind === 'projects') {
    modalTitle.value = 'Edit Project'; modalFields.value = PROJECT_FIELDS
    modalRecord.value = { ...row, github: row.links?.github || '', live: row.links?.live || '' }
  }
  if (kind === 'skills') { modalTitle.value = 'Edit Skill'; modalFields.value = SKILL_FIELDS; modalRecord.value = { ...row } }
  if (kind === 'articles') { modalTitle.value = 'Edit Artikel'; modalFields.value = ARTICLE_FIELDS; modalRecord.value = { ...row } }
  modalOpen.value = true
}

async function handleSave(out) {
  saving.value = true
  let ok = false
  if (modalKind === 'projects') {
    ok = await content.saveProject({
      id: out.id, title: out.title, description: out.description, category: out.category,
      technologies: out.technologies, status: out.status, year: out.year,
      highlights: out.highlights, sortOrder: out.sortOrder,
      links: { github: out.github, live: out.live },
    })
  } else if (modalKind === 'skills') {
    ok = await content.saveSkill(out)
  } else if (modalKind === 'articles') {
    ok = await content.saveArticle(out)
  }
  saving.value = false
  if (ok) modalOpen.value = false
}

async function handleDelete(kind, row) {
  const label = row.title || row.name
  if (!window.confirm(`Hapus "${label}"? Tindakan ini tidak bisa dibatalkan.`)) return
  if (kind === 'projects') await content.removeProject(row.id)
  if (kind === 'skills') await content.removeSkill(row.id)
  if (kind === 'articles') await content.removeArticle(row.id)
}

/* ─── profile inline editor ─── */
const profileDraft = ref(null)
const profileSaving = ref(false)

function loadProfileDraft() {
  const p = profile.value || {}
  profileDraft.value = {
    introduction: p.introduction || '',
    description: p.description || '',
    location: p.location || '',
    experience: p.experience || '',
    expertise: p.expertise || '',
    experiences: (p.experiences || []).map((e) => ({
      title: e.title || '',
      company: e.company || '',
      location: e.location || '',
      period: e.period || '',
      description: e.description || '',
      achievements: (e.achievements || []).join(', '),
    })),
    education: (p.education || []).map((e) => ({
      degree: e.degree || '',
      institution: e.institution || '',
      period: e.period || '',
      gpa: e.gpa || '',
    })),
    certifications: (p.certifications || []).join(', '),
  }
}

function addExperience() {
  profileDraft.value.experiences.push({ title: '', company: '', location: '', period: '', description: '', achievements: '' })
}
function removeExperience(idx) {
  profileDraft.value.experiences.splice(idx, 1)
}
function addEducation() {
  profileDraft.value.education.push({ degree: '', institution: '', period: '', gpa: '' })
}
function removeEducation(idx) {
  profileDraft.value.education.splice(idx, 1)
}

async function saveProfile() {
  profileSaving.value = true
  await content.saveProfile({
    introduction: profileDraft.value.introduction,
    description: profileDraft.value.description,
    location: profileDraft.value.location,
    experience: profileDraft.value.experience,
    expertise: profileDraft.value.expertise,
    experiences: profileDraft.value.experiences.map((e) => ({
      title: e.title,
      company: e.company,
      location: e.location,
      period: e.period,
      description: e.description,
      achievements: e.achievements.split(',').map((s) => s.trim()).filter(Boolean),
    })),
    education: profileDraft.value.education.map((e) => ({ ...e })),
    certifications: profileDraft.value.certifications.split(',').map((s) => s.trim()).filter(Boolean),
  })
  profileSaving.value = false
}

// Re-init draft whenever profile data arrives from Supabase OR tab switches to profile
watch(
  [profile, activeTab],
  ([p, tab]) => { if (tab === 'profile') loadProfileDraft() },
)
const profileReady = computed(() => activeTab.value === 'profile' && !!profileDraft.value)

function truncate(v, n = 60) {
  const s = Array.isArray(v) ? v.join(', ') : String(v ?? '')
  return s.length > n ? s.slice(0, n) + '…' : s
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold text-foreground tracking-tight inline-flex items-center gap-2.5">
          <span class="w-9 h-9 rounded-xl bg-brand-50 dark:bg-brand-900/30 inline-flex items-center justify-center">
            <LayoutDashboard class="w-5 h-5 text-brand-600 dark:text-brand-400" />
          </span>
          Admin Dashboard
        </h1>
        <p class="text-sm text-muted-foreground mt-1">
          Kelola konten portfolio — tersimpan langsung ke database.
        </p>
      </div>
    </div>

    <!-- Fallback warning -->
    <div
      v-if="usingFallback && !isLoading"
      class="flex items-start gap-3 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 px-4 py-3"
    >
      <AlertTriangle class="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
      <div class="text-sm text-amber-800 dark:text-amber-200">
        <p class="font-medium">
          Database belum terhubung.
        </p>
        <p class="text-xs mt-0.5 opacity-90">
          Konten yang tampil masih data contoh. Jalankan <code class="font-mono">supabase-schema.sql</code> di Supabase SQL Editor, lalu reload halaman. Penyimpanan dinonaktifkan sampai database siap.
        </p>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex flex-wrap gap-1 p-1 rounded-xl bg-muted/60 w-fit">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        :class="[
          'inline-flex items-center gap-2 px-4 h-9 rounded-lg text-sm font-medium transition-all',
          activeTab === tab.id
            ? 'bg-card text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground',
        ]"
        @click="activeTab = tab.id"
      >
        <component
          :is="tab.icon"
          class="w-4 h-4"
        />
        {{ tab.label }}
      </button>
    </div>

    <!-- ───────────── PROFILE ───────────── -->
    <div
      v-if="activeTab === 'profile' && profileReady"
      class="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4"
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-foreground">Introduction</label>
          <input
            v-model="profileDraft.introduction"
            class="input-base"
          >
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-foreground">Lokasi</label>
          <input
            v-model="profileDraft.location"
            class="input-base"
          >
        </div>
        <div class="flex flex-col gap-1.5 sm:col-span-2">
          <label class="text-xs font-medium text-foreground">Deskripsi</label>
          <textarea
            v-model="profileDraft.description"
            rows="3"
            class="input-base resize-y"
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-foreground">Label pengalaman</label>
          <input
            v-model="profileDraft.experience"
            class="input-base"
          >
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-medium text-foreground">Label keahlian</label>
          <input
            v-model="profileDraft.expertise"
            class="input-base"
          >
        </div>
        <div class="flex flex-col gap-1.5 sm:col-span-2">
          <label class="text-xs font-medium text-foreground">Sertifikasi <span class="text-muted-foreground font-normal">(pisahkan dengan koma)</span></label>
          <textarea
            v-model="profileDraft.certifications"
            rows="2"
            class="input-base resize-y"
          />
        </div>
        <!-- ── Experiences ── -->
        <div class="flex flex-col gap-3 sm:col-span-2">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Experiences</label>
            <span class="text-xs text-muted-foreground">{{ profileDraft.experiences.length }} item</span>
          </div>
          <div class="space-y-3">
            <div
              v-for="(exp, i) in profileDraft.experiences"
              :key="i"
              class="rounded-xl border border-border bg-card overflow-hidden shadow-sm"
            >
              <div class="flex items-center justify-between px-4 py-2.5 bg-brand-50 dark:bg-brand-900/20 border-b border-border">
                <div class="flex items-center gap-2 min-w-0">
                  <Briefcase class="w-3.5 h-3.5 text-brand-500 dark:text-brand-400 shrink-0" />
                  <span class="text-xs font-semibold text-brand-900 dark:text-brand-100 truncate">
                    {{ exp.title || 'New Experience' }}
                  </span>
                  <span
                    v-if="exp.company"
                    class="text-xs text-brand-600 dark:text-brand-400 truncate"
                  >@ {{ exp.company }}</span>
                </div>
                <button
                  type="button"
                  title="Hapus"
                  class="ml-2 shrink-0 h-6 w-6 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  @click="removeExperience(i)"
                >
                  <Trash2 class="w-3.5 h-3.5" />
                </button>
              </div>
              <div class="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="flex flex-col gap-1">
                  <label class="text-xs text-muted-foreground">Jabatan</label>
                  <input
                    v-model="exp.title"
                    placeholder="e.g. Senior Software Engineer"
                    class="input-base"
                  >
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-xs text-muted-foreground">Perusahaan</label>
                  <input
                    v-model="exp.company"
                    placeholder="e.g. Tech Solutions Inc."
                    class="input-base"
                  >
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-xs text-muted-foreground">Lokasi</label>
                  <input
                    v-model="exp.location"
                    placeholder="e.g. Jakarta, Indonesia"
                    class="input-base"
                  >
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-xs text-muted-foreground">Periode</label>
                  <input
                    v-model="exp.period"
                    placeholder="e.g. 2022 - Present"
                    class="input-base"
                  >
                </div>
                <div class="flex flex-col gap-1 sm:col-span-2">
                  <label class="text-xs text-muted-foreground">Deskripsi</label>
                  <textarea
                    v-model="exp.description"
                    rows="2"
                    placeholder="Deskripsi peran dan tanggung jawab…"
                    class="input-base resize-none"
                  />
                </div>
                <div class="flex flex-col gap-1 sm:col-span-2">
                  <label class="text-xs text-muted-foreground">Achievements <span class="opacity-60">(pisahkan dengan koma)</span></label>
                  <textarea
                    v-model="exp.achievements"
                    rows="2"
                    placeholder="Achievement 1, Achievement 2, Achievement 3…"
                    class="input-base resize-none"
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              class="w-full rounded-xl border-2 border-dashed border-border hover:border-brand-400 dark:hover:border-brand-600 hover:bg-brand-50/50 dark:hover:bg-brand-900/10 flex items-center justify-center gap-2 py-3 text-sm text-muted-foreground hover:text-brand-600 dark:hover:text-brand-400 transition-all"
              @click="addExperience"
            >
              <Plus class="w-4 h-4" />
              Tambah Experience
            </button>
          </div>
        </div>

        <!-- ── Education ── -->
        <div class="flex flex-col gap-3 sm:col-span-2">
          <div class="flex items-center justify-between">
            <label class="text-xs font-medium text-foreground">Education</label>
            <span class="text-xs text-muted-foreground">{{ profileDraft.education.length }} item</span>
          </div>
          <div class="space-y-3">
            <div
              v-for="(edu, i) in profileDraft.education"
              :key="i"
              class="rounded-xl border border-border bg-card overflow-hidden shadow-sm"
            >
              <div class="flex items-center justify-between px-4 py-2.5 bg-emerald-50 dark:bg-emerald-900/20 border-b border-border">
                <div class="flex items-center gap-2 min-w-0">
                  <BookOpen class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span class="text-xs font-semibold text-emerald-900 dark:text-emerald-100 truncate">
                    {{ edu.degree || 'New Education' }}
                  </span>
                  <span
                    v-if="edu.institution"
                    class="text-xs text-emerald-600 dark:text-emerald-400 truncate"
                  >@ {{ edu.institution }}</span>
                </div>
                <button
                  type="button"
                  title="Hapus"
                  class="ml-2 shrink-0 h-6 w-6 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  @click="removeEducation(i)"
                >
                  <Trash2 class="w-3.5 h-3.5" />
                </button>
              </div>
              <div class="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="flex flex-col gap-1 sm:col-span-2">
                  <label class="text-xs text-muted-foreground">Gelar / Program</label>
                  <input
                    v-model="edu.degree"
                    placeholder="e.g. Bachelor of Informatics Engineering"
                    class="input-base"
                  >
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-xs text-muted-foreground">Institusi</label>
                  <input
                    v-model="edu.institution"
                    placeholder="e.g. University of Gunadarma"
                    class="input-base"
                  >
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-xs text-muted-foreground">Periode</label>
                  <input
                    v-model="edu.period"
                    placeholder="e.g. 2016 - 2020"
                    class="input-base"
                  >
                </div>
                <div class="flex flex-col gap-1">
                  <label class="text-xs text-muted-foreground">GPA / Nilai</label>
                  <input
                    v-model="edu.gpa"
                    placeholder="e.g. 3.5/4.0"
                    class="input-base"
                  >
                </div>
              </div>
            </div>
            <button
              type="button"
              class="w-full rounded-xl border-2 border-dashed border-border hover:border-emerald-400 dark:hover:border-emerald-600 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 flex items-center justify-center gap-2 py-3 text-sm text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
              @click="addEducation"
            >
              <Plus class="w-4 h-4" />
              Tambah Education
            </button>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <Button
          variant="primary"
          size="sm"
          :disabled="profileSaving"
          @click="saveProfile"
        >
          <Save class="w-3.5 h-3.5" />
          {{ profileSaving ? 'Menyimpan…' : 'Simpan Profil' }}
        </Button>
      </div>
    </div>

    <!-- ───────────── PROJECTS ───────────── -->
    <div
      v-else-if="activeTab === 'projects'"
      class="space-y-3"
    >
      <div class="flex justify-end">
        <Button
          variant="primary"
          size="sm"
          @click="openCreate('projects')"
        >
          <Plus class="w-4 h-4" /> Tambah Project
        </Button>
      </div>
      <div class="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div class="overflow-x-auto scrollbar-thin">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-border bg-muted/40 text-left text-xs text-muted-foreground">
                <th class="px-4 py-3 font-medium">
                  Judul
                </th>
                <th class="px-4 py-3 font-medium">
                  Kategori
                </th>
                <th class="px-4 py-3 font-medium">
                  Status
                </th>
                <th class="px-4 py-3 font-medium">
                  Teknologi
                </th>
                <th class="px-4 py-3 font-medium text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="p in projects"
                :key="p.id"
                class="border-b border-border/60 last:border-0 hover:bg-accent/40 transition-colors"
              >
                <td class="px-4 py-3 font-medium text-foreground max-w-[16rem] truncate">
                  {{ p.title }}
                </td>
                <td class="px-4 py-3 text-muted-foreground">
                  {{ p.category }}
                </td>
                <td class="px-4 py-3">
                  <Badge variant="primary">
                    {{ p.status }}
                  </Badge>
                </td>
                <td class="px-4 py-3 text-muted-foreground text-xs">
                  {{ truncate(p.technologies, 40) }}
                </td>
                <td class="px-4 py-3">
                  <div class="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      title="Edit"
                      class="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-brand-600 hover:bg-accent transition-colors"
                      @click="openEdit('projects', p)"
                    >
                      <Pencil class="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      title="Hapus"
                      class="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      @click="handleDelete('projects', p)"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="!projects.length">
                <td
                  colspan="5"
                  class="px-4 py-10 text-center text-muted-foreground text-sm"
                >
                  Belum ada project.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ───────────── SKILLS ───────────── -->
    <div
      v-else-if="activeTab === 'skills'"
      class="space-y-3"
    >
      <div class="flex justify-end">
        <Button
          variant="primary"
          size="sm"
          @click="openCreate('skills')"
        >
          <Plus class="w-4 h-4" /> Tambah Skill
        </Button>
      </div>
      <div class="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div class="overflow-x-auto scrollbar-thin">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-border bg-muted/40 text-left text-xs text-muted-foreground">
                <th class="px-4 py-3 font-medium">
                  Nama
                </th>
                <th class="px-4 py-3 font-medium">
                  Kategori
                </th>
                <th class="px-4 py-3 font-medium">
                  Icon
                </th>
                <th class="px-4 py-3 font-medium text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="s in skills"
                :key="s.id"
                class="border-b border-border/60 last:border-0 hover:bg-accent/40 transition-colors"
              >
                <td class="px-4 py-3 font-medium text-foreground">
                  <span class="inline-flex items-center gap-2">
                    <img
                      v-if="s.icon"
                      :src="s.icon"
                      :alt="s.name"
                      class="w-4 h-4"
                    >
                    {{ s.name }}
                  </span>
                </td>
                <td class="px-4 py-3">
                  <Badge variant="outline">
                    {{ s.category }}
                  </Badge>
                </td>
                <td class="px-4 py-3 text-muted-foreground text-xs">
                  {{ truncate(s.icon, 40) }}
                </td>
                <td class="px-4 py-3">
                  <div class="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      title="Edit"
                      class="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-brand-600 hover:bg-accent transition-colors"
                      @click="openEdit('skills', s)"
                    >
                      <Pencil class="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      title="Hapus"
                      class="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      @click="handleDelete('skills', s)"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="!skills.length">
                <td
                  colspan="4"
                  class="px-4 py-10 text-center text-muted-foreground text-sm"
                >
                  Belum ada skill.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- ───────────── ARTICLES ───────────── -->
    <div
      v-else-if="activeTab === 'articles'"
      class="space-y-3"
    >
      <div class="flex justify-end">
        <Button
          variant="primary"
          size="sm"
          @click="openCreate('articles')"
        >
          <Plus class="w-4 h-4" /> Tambah Artikel
        </Button>
      </div>
      <div class="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        <div class="overflow-x-auto scrollbar-thin">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-border bg-muted/40 text-left text-xs text-muted-foreground">
                <th class="px-4 py-3 font-medium">
                  Judul
                </th>
                <th class="px-4 py-3 font-medium">
                  Kategori
                </th>
                <th class="px-4 py-3 font-medium">
                  Status
                </th>
                <th class="px-4 py-3 font-medium">
                  Tanggal
                </th>
                <th class="px-4 py-3 font-medium text-right">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="a in articles"
                :key="a.id"
                class="border-b border-border/60 last:border-0 hover:bg-accent/40 transition-colors"
              >
                <td class="px-4 py-3 font-medium text-foreground max-w-[18rem] truncate">
                  <span class="inline-flex items-center gap-2">
                    {{ a.title }}
                    <Badge
                      v-if="a.featured"
                      variant="primary"
                    >★</Badge>
                  </span>
                </td>
                <td class="px-4 py-3 text-muted-foreground">
                  {{ a.category }}
                </td>
                <td class="px-4 py-3">
                  <Badge :variant="a.status === 'Published' ? 'success' : 'warning'">
                    {{ a.status }}
                  </Badge>
                </td>
                <td class="px-4 py-3 text-muted-foreground text-xs">
                  {{ a.publishDate }}
                </td>
                <td class="px-4 py-3">
                  <div class="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      title="Edit"
                      class="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-brand-600 hover:bg-accent transition-colors"
                      @click="openEdit('articles', a)"
                    >
                      <Pencil class="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      title="Hapus"
                      class="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      @click="handleDelete('articles', a)"
                    >
                      <Trash2 class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="!articles.length">
                <td
                  colspan="5"
                  class="px-4 py-10 text-center text-muted-foreground text-sm"
                >
                  Belum ada artikel.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <RecordModal
      :open="modalOpen"
      :title="modalTitle"
      :fields="modalFields"
      :record="modalRecord"
      :saving="saving"
      @save="handleSave"
      @close="modalOpen = false"
    />
  </div>
</template>
