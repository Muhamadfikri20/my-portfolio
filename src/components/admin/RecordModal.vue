<script setup>
/**
 * Generic record editor modal driven by a field schema.
 * field = { key, label, type, options?, placeholder?, full? }
 *   type: text | textarea | number | checkbox | select | list | json
 *   - list: comma-separated input <-> array
 *   - json: pretty-printed JSON textarea <-> object/array
 */
import { ref, watch, computed } from 'vue'
import { X, Save } from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: 'Edit' },
  fields: { type: Array, default: () => [] },
  record: { type: Object, default: () => ({}) },
  saving: { type: Boolean, default: false },
})
const emit = defineEmits(['save', 'close'])

const draft = ref({})
const jsonError = ref('')

function hydrate() {
  const d = {}
  for (const f of props.fields) {
    const v = props.record?.[f.key]
    if (f.type === 'list') d[f.key] = Array.isArray(v) ? v.join(', ') : (v || '')
    else if (f.type === 'json') d[f.key] = JSON.stringify(v ?? (f.array ? [] : {}), null, 2)
    else if (f.type === 'checkbox') d[f.key] = !!v
    else d[f.key] = v ?? ''
  }
  draft.value = d
  jsonError.value = ''
}

watch(() => [props.open, props.record], () => { if (props.open) hydrate() }, { immediate: true })

const canSave = computed(() => !jsonError.value && !props.saving)

function submit() {
  const out = {}
  for (const f of props.fields) {
    if (f.type === 'json') {
      try {
        out[f.key] = draft.value[f.key]?.trim() ? JSON.parse(draft.value[f.key]) : (f.array ? [] : {})
      } catch {
        jsonError.value = `Format JSON tidak valid pada "${f.label}"`
        return
      }
    } else if (f.type === 'number') {
      out[f.key] = Number(draft.value[f.key]) || 0
    } else {
      out[f.key] = draft.value[f.key]
    }
  }
  if (props.record?.id != null) out.id = props.record.id
  emit('save', out)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="open"
        class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        @click.self="emit('close')"
      >
        <div class="bg-card text-card-foreground rounded-2xl w-full max-w-2xl border border-border shadow-soft-md max-h-[90vh] flex flex-col overflow-hidden">
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-border/60 bg-gradient-to-r from-brand-50/60 to-transparent dark:from-brand-900/20">
            <h2 class="text-base font-semibold text-foreground">
              {{ title }}
            </h2>
            <button
              type="button"
              aria-label="Close"
              class="h-8 w-8 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              @click="emit('close')"
            >
              <X class="w-4 h-4" />
            </button>
          </div>

          <!-- Body -->
          <form
            class="px-6 py-5 overflow-y-auto scrollbar-thin"
            @submit.prevent="submit"
          >
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
              <div
                v-for="f in fields"
                :key="f.key"
                :class="['flex flex-col gap-1.5', (f.full || ['textarea','json','list'].includes(f.type)) && 'sm:col-span-2']"
              >
                <label class="text-xs font-medium text-foreground">{{ f.label }}</label>

                <textarea
                  v-if="f.type === 'textarea'"
                  v-model="draft[f.key]"
                  rows="3"
                  :placeholder="f.placeholder"
                  class="input-base resize-y"
                />
                <textarea
                  v-else-if="f.type === 'json'"
                  v-model="draft[f.key]"
                  rows="6"
                  class="input-base resize-y font-mono text-xs"
                />
                <select
                  v-else-if="f.type === 'select'"
                  v-model="draft[f.key]"
                  class="input-base"
                >
                  <option
                    v-for="opt in f.options"
                    :key="opt"
                    :value="opt"
                  >
                    {{ opt }}
                  </option>
                </select>
                <label
                  v-else-if="f.type === 'checkbox'"
                  class="inline-flex items-center gap-2 h-9"
                >
                  <input
                    v-model="draft[f.key]"
                    type="checkbox"
                    class="h-4 w-4 rounded border-border accent-[var(--primary)]"
                  >
                  <span class="text-sm text-muted-foreground">{{ f.placeholder || 'Ya' }}</span>
                </label>
                <input
                  v-else
                  v-model="draft[f.key]"
                  :type="f.type === 'number' ? 'number' : 'text'"
                  :placeholder="f.placeholder"
                  class="input-base"
                >

                <p
                  v-if="f.hint"
                  class="text-[11px] text-muted-foreground"
                >
                  {{ f.hint }}
                </p>
              </div>
            </div>

            <p
              v-if="jsonError"
              class="mt-3 text-xs text-red-600 dark:text-red-400"
            >
              {{ jsonError }}
            </p>

            <div class="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-border/60">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                @click="emit('close')"
              >
                Batal
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                :disabled="!canSave"
              >
                <Save class="w-3.5 h-3.5" />
                {{ saving ? 'Menyimpan…' : 'Simpan' }}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity .2s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
</style>
