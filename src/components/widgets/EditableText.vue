<script setup>
// Phase 4 stub — full implementation in Phase 5
import { ref, computed } from 'vue'
import { Edit3 } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  modelValue: { type: String, default: '' },
  multiline: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue'])

const auth = useAuthStore()
const editing = ref(false)
const draft = ref(props.modelValue)

const canEdit = computed(() => auth.isEditMode && auth.isAdmin)

function startEdit() {
  draft.value = props.modelValue
  editing.value = true
}
function save() {
  emit('update:modelValue', draft.value)
  editing.value = false
}
function cancel() {
  draft.value = props.modelValue
  editing.value = false
}
</script>

<template>
  <span
    v-if="!editing"
    class="inline-flex items-center gap-1 group"
  >
    <slot>{{ modelValue }}</slot>
    <button
      v-if="canEdit"
      type="button"
      aria-label="Edit"
      class="opacity-0 group-hover:opacity-100 transition-opacity"
      @click="startEdit"
    >
      <Edit3 class="w-3 h-3 theme-text-secondary" />
    </button>
  </span>
  <span
    v-else
    class="inline-flex gap-1 items-center"
  >
    <textarea
      v-if="multiline"
      v-model="draft"
      class="border theme-border rounded px-2 py-1 text-sm bg-transparent"
      rows="3"
    />
    <input
      v-else
      v-model="draft"
      type="text"
      class="border theme-border rounded px-2 py-1 text-sm bg-transparent"
    >
    <button
      type="button"
      class="text-xs theme-primary"
      @click="save"
    >Save</button>
    <button
      type="button"
      class="text-xs theme-text-secondary"
      @click="cancel"
    >Cancel</button>
  </span>
</template>
