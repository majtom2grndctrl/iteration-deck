<template>
  <div :class="heroClass">
    <div v-if="variant === 'centered'" class="hero-centered">
      <h1>Transform Your Workflow</h1>
      <p>Powerful tools for modern teams</p>
      <button class="btn btn-primary" @click="handleAction">
        Start Free Trial
      </button>
    </div>

    <div v-else-if="variant === 'split'" class="hero-split">
      <div class="hero-content">
        <h1>Build Amazing Products</h1>
        <p>Split layout balances content with visual elements for better engagement.</p>
        <button class="btn btn-primary" @click="handleAction">
          Learn More
        </button>
      </div>
      <div class="hero-visual">
        📊 Interactive Demo
      </div>
    </div>

    <div v-else-if="variant === 'minimal'" class="hero-minimal">
      <h1>Simple. Powerful. Effective.</h1>
      <p>Minimal design that lets your content shine</p>
      <button class="btn btn-outline" @click="handleAction">
        Get Started
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant: 'centered' | 'split' | 'minimal'
}

const props = defineProps<Props>()

const emit = defineEmits<{
  action: [variant: string]
}>()

const heroClass = computed(() => `hero hero--${props.variant}`)

const handleAction = () => {
  emit('action', props.variant)
  console.log(`Hero ${props.variant} action triggered`)
}
</script>

<style scoped>
.hero {
  border-radius: 8px;
  overflow: hidden;
}

.hero-centered {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 2rem;
  text-align: center;
}

.hero-centered h1 {
  margin: 0 0 1rem 0;
  font-size: 2.5rem;
}

.hero-centered p {
  margin: 0 0 2rem 0;
  font-size: 1.25rem;
  opacity: 0.9;
}

.hero-split {
  background: #f3f4f6;
  padding: 2rem;
  display: flex;
  gap: 2rem;
  align-items: center;
}

.hero-content {
  flex: 1;
}

.hero-content h1 {
  margin: 0 0 1rem 0;
  color: #1f2937;
}

.hero-content p {
  margin: 0 0 2rem 0;
  color: #6b7280;
}

.hero-visual {
  flex: 1;
  height: 200px;
  background: #e5e7eb;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 18px;
}

.hero-minimal {
  background: white;
  padding: 4rem 2rem;
  text-align: center;
  border: 1px solid #e5e7eb;
}

.hero-minimal h1 {
  margin: 0 0 1rem 0;
  color: #1f2937;
  font-weight: 400;
}

.hero-minimal p {
  margin: 0 0 2rem 0;
  color: #6b7280;
}

.btn {
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
  border: none;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-outline {
  background: transparent;
  color: #3b82f6;
  border: 2px solid #3b82f6;
}
</style>