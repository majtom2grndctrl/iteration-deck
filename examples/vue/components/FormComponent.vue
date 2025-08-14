<template>
  <div class="form-container">
    <form v-if="!submitted" @submit.prevent="handleSubmit" :class="formClass">
      <div class="field-group">
        <label for="name" class="field-label">Name</label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          :class="inputClass"
          required
        />
      </div>

      <div class="field-group">
        <label for="email" class="field-label">Email</label>
        <input
          id="email"
          v-model="formData.email"
          type="email"
          :class="inputClass"
          required
        />
      </div>

      <div class="field-group">
        <label for="message" class="field-label">Message</label>
        <textarea
          id="message"
          v-model="formData.message"
          rows="3"
          :class="textareaClass"
          required
        />
      </div>

      <button type="submit" :class="buttonClass" :disabled="isSubmitting">
        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
      </button>
    </form>

    <div v-else class="success-message">
      <h3>✅ Form Submitted Successfully!</h3>
      <p>Thank you for your message, {{ formData.name }}!</p>
      <button @click="resetForm" class="reset-button">
        Send Another Message
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'

interface Props {
  layout: 'vertical' | 'horizontal' | 'grid'
  styleVariant: 'modern' | 'classic' | 'minimal'
}

const props = defineProps<Props>()

const emit = defineEmits<{
  submit: [data: FormData]
}>()

interface FormData {
  name: string
  email: string
  message: string
}

const formData = reactive<FormData>({
  name: '',
  email: '',
  message: ''
})

const submitted = ref(false)
const isSubmitting = ref(false)

const formClass = computed(() => [
  'form',
  `form--${props.layout}`,
  `form--${props.styleVariant}`
])

const inputClass = computed(() => [
  'form-input',
  `form-input--${props.styleVariant}`
])

const textareaClass = computed(() => [
  'form-textarea',
  `form-textarea--${props.styleVariant}`
])

const buttonClass = computed(() => [
  'form-button',
  `form-button--${props.styleVariant}`
])

const handleSubmit = async () => {
  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  emit('submit', { ...formData })
  submitted.value = true
  isSubmitting.value = false
}

const resetForm = () => {
  Object.assign(formData, { name: '', email: '', message: '' })
  submitted.value = false
}
</script>

<style scoped>
.form-container {
  min-height: 200px;
}

.form {
  display: flex;
  gap: 1rem;
}

.form--vertical {
  flex-direction: column;
  max-width: 400px;
}

.form--horizontal {
  align-items: end;
  flex-wrap: wrap;
}

.form--grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  max-width: 600px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.field-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.form-input, .form-textarea {
  transition: all 0.2s ease;
  font-family: inherit;
}

.form-input:focus, .form-textarea:focus {
  outline: none;
}

/* Modern Style */
.form-input--modern, .form-textarea--modern {
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 16px;
  background: white;
}

.form-input--modern:focus, .form-textarea--modern:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-button--modern {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.form-button--modern:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-button--modern:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* Classic Style */
.form-input--classic, .form-textarea--classic {
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  background: #f9fafb;
}

.form-input--classic:focus, .form-textarea--classic:focus {
  border-color: #3b82f6;
  background: white;
}

.form-button--classic {
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.form-button--classic:hover:not(:disabled) {
  background: #2563eb;
}

.form-button--classic:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Minimal Style */
.form-input--minimal, .form-textarea--minimal {
  border: none;
  border-bottom: 2px solid #e5e7eb;
  border-radius: 0;
  padding: 8px 0;
  font-size: 16px;
  background: transparent;
}

.form-input--minimal:focus, .form-textarea--minimal:focus {
  border-bottom-color: #3b82f6;
}

.form-button--minimal {
  background: transparent;
  color: #3b82f6;
  border: 2px solid #3b82f6;
  border-radius: 0;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.form-button--minimal:hover:not(:disabled) {
  background: #3b82f6;
  color: white;
}

.form-button--minimal:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.form-textarea {
  resize: vertical;
}

.success-message {
  padding: 2rem;
  text-align: center;
  background: #f0fdf4;
  border: 1px solid #22c55e;
  border-radius: 8px;
  color: #166534;
}

.success-message h3 {
  margin: 0 0 1rem 0;
}

.success-message p {
  margin: 0 0 1.5rem 0;
}

.reset-button {
  background: #22c55e;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.reset-button:hover {
  background: #16a34a;
}
</style>