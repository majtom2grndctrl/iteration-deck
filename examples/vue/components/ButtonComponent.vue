<template>
  <button 
    :class="buttonClass" 
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  variant: 'primary' | 'secondary' | 'outline' | 'gradient'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const isHovered = ref(false)

const buttonClass = computed(() => [
  'btn',
  `btn--${props.variant}`,
  {
    'btn--disabled': props.disabled,
    'btn--hovered': isHovered.value
  }
])

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}

const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
}
</script>

<style scoped>
.btn {
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
  outline: none;
  font-family: inherit;
}

.btn:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

.btn--hovered {
  transform: translateY(-1px);
}

.btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn--disabled:hover {
  transform: none;
}

.btn--primary {
  background: #3b82f6;
  color: white;
}

.btn--primary:hover:not(.btn--disabled) {
  background: #2563eb;
}

.btn--secondary {
  background: #6b7280;
  color: white;
}

.btn--secondary:hover:not(.btn--disabled) {
  background: #4b5563;
}

.btn--outline {
  background: transparent;
  color: #3b82f6;
  border: 2px solid #3b82f6;
}

.btn--outline:hover:not(.btn--disabled) {
  background: #3b82f6;
  color: white;
}

.btn--gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn--gradient:hover:not(.btn--disabled) {
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}
</style>