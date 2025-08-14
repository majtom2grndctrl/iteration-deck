<template>
  <div class="vue-example">
    <h1>🎛️ Iteration Deck - Vue Integration</h1>
    <p>
      This example demonstrates how to integrate Iteration Deck components 
      with Vue 3 Composition API and TypeScript.
    </p>

    <div class="integration-tip">
      <strong>💡 Vue Integration Tips:</strong>
      <ul>
        <li>Web components work seamlessly with Vue</li>
        <li>Use ref templates for component access</li>
        <li>Reactive state updates automatically</li>
        <li>Event handling works with Vue methods</li>
      </ul>
    </div>

    <!-- Hero Section Variations -->
    <section class="example-section">
      <h2>Hero Section Variations</h2>
      <p>Vue components wrapped in Iteration Deck slides</p>

      <iteration-deck
        id="vue-heroes"
        label="Vue Hero Components"
        prompt="Create 3 Vue hero components with different layouts"
      >
        <iteration-deck-slide
          label="Centered"
          ai-prompt="Bold centered hero with gradient background"
          :confidence="0.92"
          notes="High impact design for landing pages"
        >
          <HeroComponent variant="centered" />
        </iteration-deck-slide>

        <iteration-deck-slide
          label="Split Layout"
          ai-prompt="Content left, visual right, professional look"
          :confidence="0.87"
        >
          <HeroComponent variant="split" />
        </iteration-deck-slide>

        <iteration-deck-slide
          label="Minimal"
          ai-prompt="Clean minimal design with subtle borders"
          :confidence="0.95"
          notes="Best for B2B audiences, converts well"
        >
          <HeroComponent variant="minimal" />
        </iteration-deck-slide>
      </iteration-deck>
    </section>

    <!-- Interactive Button Variations -->
    <section class="example-section">
      <h2>Interactive Button Variations</h2>
      <p>Vue button components with reactive state</p>

      <iteration-deck
        id="vue-buttons"
        label="Vue Button Components"
        prompt="Create accessible Vue button component with style variants"
      >
        <iteration-deck-slide
          label="Primary"
          ai-prompt="Bold primary button, high contrast"
          :confidence="0.95"
        >
          <div class="button-demo">
            <ButtonComponent
              variant="primary"
              @click="handleButtonClick('primary')"
            >
              Get Started
            </ButtonComponent>
            <p class="button-description">
              High contrast, excellent accessibility
            </p>
            <div class="click-counter">
              Clicked {{ clickCounts.primary }} times
            </div>
          </div>
        </iteration-deck-slide>

        <iteration-deck-slide
          label="Outline"
          ai-prompt="Subtle outline style, professional look"
          :confidence="0.87"
        >
          <div class="button-demo">
            <ButtonComponent
              variant="outline"
              @click="handleButtonClick('outline')"
            >
              Get Started
            </ButtonComponent>
            <p class="button-description">
              Subtle, professional appearance
            </p>
            <div class="click-counter">
              Clicked {{ clickCounts.outline }} times
            </div>
          </div>
        </iteration-deck-slide>

        <iteration-deck-slide
          label="Gradient"
          ai-prompt="Eye-catching gradient with depth"
          :confidence="0.92"
          notes="Great for hero sections and key CTAs"
        >
          <div class="button-demo">
            <ButtonComponent
              variant="gradient"
              @click="handleButtonClick('gradient')"
            >
              Get Started
            </ButtonComponent>
            <p class="button-description">
              Visual interest with gradient background
            </p>
            <div class="click-counter">
              Clicked {{ clickCounts.gradient }} times
            </div>
          </div>
        </iteration-deck-slide>
      </iteration-deck>
    </section>

    <!-- Dynamic Form Component -->
    <section class="example-section">
      <h2>Dynamic Form Layouts</h2>
      <p>Reactive Vue forms with different layouts</p>

      <div class="form-controls">
        <label>
          Form Style:
          <select v-model="selectedFormStyle">
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
            <option value="minimal">Minimal</option>
          </select>
        </label>
        <div class="form-stats">
          Form submissions: {{ formSubmissions }}
        </div>
      </div>

      <iteration-deck
        id="vue-forms"
        label="Vue Form Components"
        prompt="Create responsive Vue form layouts with state management"
      >
        <iteration-deck-slide
          label="Vertical Layout"
          ai-prompt="Stack form fields vertically for mobile-first design"
          :confidence="0.94"
        >
          <FormComponent
            layout="vertical"
            :style-variant="selectedFormStyle"
            @submit="handleFormSubmit"
          />
        </iteration-deck-slide>

        <iteration-deck-slide
          label="Horizontal Layout"
          ai-prompt="Arrange fields horizontally for desktop efficiency"
          :confidence="0.87"
        >
          <FormComponent
            layout="horizontal"
            :style-variant="selectedFormStyle"
            @submit="handleFormSubmit"
          />
        </iteration-deck-slide>

        <iteration-deck-slide
          label="Grid Layout"
          ai-prompt="Use CSS Grid for responsive form design"
          :confidence="0.91"
          notes="Best for complex forms with many fields"
        >
          <FormComponent
            layout="grid"
            :style-variant="selectedFormStyle"
            @submit="handleFormSubmit"
          />
        </iteration-deck-slide>
      </iteration-deck>
    </section>

    <!-- Data Visualization -->
    <section class="example-section">
      <h2>Data Visualization Components</h2>
      <p>Vue components with live reactive data</p>

      <iteration-deck
        id="vue-charts"
        label="Vue Chart Components"
        description="Data visualization with reactive updates"
      >
        <iteration-deck-slide
          label="Simple Chart"
          :confidence="0.89"
        >
          <ChartComponent
            variant="simple"
            :data="chartData"
            @refresh="refreshChartData"
          />
        </iteration-deck-slide>

        <iteration-deck-slide
          label="Detailed Chart"
          :confidence="0.92"
          notes="Includes real-time updates"
        >
          <ChartComponent
            variant="detailed"
            :data="chartData"
            @refresh="refreshChartData"
          />
        </iteration-deck-slide>

        <iteration-deck-slide
          label="Interactive Chart"
          :confidence="0.86"
        >
          <ChartComponent
            variant="interactive"
            :data="chartData"
            @refresh="refreshChartData"
            @datapoint-click="handleDatapointClick"
          />
        </iteration-deck-slide>
      </iteration-deck>
    </section>

    <!-- Vue Integration Guide -->
    <section class="example-section">
      <h2>🔧 Vue Integration Best Practices</h2>
      <div class="best-practices-grid">
        <div class="practice-card practice-card--setup">
          <h4>🎯 Component Setup</h4>
          <ul>
            <li>Import web components in main.js</li>
            <li>Use TypeScript for type safety</li>
            <li>Wrap Vue components in slides</li>
            <li>Event emitters work normally</li>
          </ul>
        </div>

        <div class="practice-card practice-card--reactivity">
          <h4>🚀 Reactivity Features</h4>
          <ul>
            <li>Reactive state updates automatically</li>
            <li>Computed properties for derived data</li>
            <li>Watchers for side effects</li>
            <li>Lifecycle hooks for setup/cleanup</li>
          </ul>
        </div>

        <div class="practice-card practice-card--workflow">
          <h4>👥 Team Workflow</h4>
          <ul>
            <li>Share live Vue prototypes</li>
            <li>Compare component variants</li>
            <li>Track AI generation context</li>
            <li>Present to stakeholders</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Development vs Production -->
    <section class="example-section">
      <h2>🔧 Development vs Production Behavior</h2>
      <div class="environment-grid">
        <div class="env-card env-card--dev">
          <h4>Development Mode</h4>
          <ul>
            <li>Global toolbar with navigation</li>
            <li>Multi-deck selector dropdown</li>
            <li>Keyboard shortcuts (Ctrl/Cmd + ←/→)</li>
            <li>AI confidence scores visible</li>
            <li>All slides available for comparison</li>
          </ul>
        </div>
        <div class="env-card env-card--prod">
          <h4>Production Mode</h4>
          <ul>
            <li>No toolbar or dev tools</li>
            <li>Only first slide rendered</li>
            <li>Zero overhead</li>
            <li>Clean presentation mode</li>
            <li>Static HTML-like behavior</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { defineCustomElements } from 'iteration-deck/loader'
import HeroComponent from './components/HeroComponent.vue'
import ButtonComponent from './components/ButtonComponent.vue'
import FormComponent from './components/FormComponent.vue'
import ChartComponent from './components/ChartComponent.vue'

// Initialize the web components
defineCustomElements()

// Reactive state
const clickCounts = reactive({
  primary: 0,
  outline: 0,
  gradient: 0,
})

const selectedFormStyle = ref<'modern' | 'classic' | 'minimal'>('modern')
const formSubmissions = ref(0)

const chartData = reactive({
  users: 1234,
  revenue: 45678,
  growth: 12.5,
  lastUpdate: new Date(),
})

// Computed properties
const totalClicks = computed(() => {
  return Object.values(clickCounts).reduce((sum, count) => sum + count, 0)
})

// Methods
const handleButtonClick = (variant: keyof typeof clickCounts) => {
  clickCounts[variant]++
  console.log(`${variant} button clicked! Total clicks: ${totalClicks.value}`)
}

const handleFormSubmit = (formData: any) => {
  formSubmissions.value++
  console.log('Form submitted:', formData)
}

const refreshChartData = () => {
  chartData.users = Math.floor(Math.random() * 10000)
  chartData.revenue = Math.floor(Math.random() * 100000)
  chartData.growth = (Math.random() - 0.5) * 50
  chartData.lastUpdate = new Date()
}

const handleDatapointClick = (datapoint: any) => {
  console.log('Datapoint clicked:', datapoint)
}

// Auto-refresh chart data
let chartInterval: NodeJS.Timeout

onMounted(() => {
  console.log('🎛️ Vue Iteration Deck example loaded')
  
  // Start auto-refresh for chart data
  chartInterval = setInterval(refreshChartData, 5000)
})

onUnmounted(() => {
  if (chartInterval) {
    clearInterval(chartInterval)
  }
})
</script>

<style scoped>
.vue-example {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #f8fafc;
}

.integration-tip {
  background: #f1f5f9;
  padding: 1rem;
  border-radius: 6px;
  margin: 1rem 0;
  font-size: 14px;
  border-left: 4px solid #3b82f6;
}

.integration-tip ul {
  margin: 0.5rem 0 0 0;
  padding-left: 1.25rem;
}

.example-section {
  margin: 3rem 0;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.button-demo {
  padding: 2rem;
  text-align: center;
}

.button-description {
  margin-top: 1rem;
  color: #6b7280;
  font-size: 14px;
}

.click-counter {
  margin-top: 0.5rem;
  font-size: 12px;
  color: #3b82f6;
  font-weight: 600;
}

.form-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 6px;
}

.form-controls label {
  font-size: 14px;
  font-weight: 500;
}

.form-controls select {
  margin-left: 0.5rem;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #d1d5db;
}

.form-stats {
  font-size: 14px;
  color: #6b7280;
}

.best-practices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.practice-card {
  padding: 1.5rem;
  border-radius: 8px;
}

.practice-card--setup {
  background: #f0f9ff;
  border: 1px solid #0ea5e9;
}

.practice-card--setup h4 {
  color: #0369a1;
  margin: 0 0 0.5rem 0;
}

.practice-card--setup ul {
  margin: 0;
  padding-left: 1.25rem;
  color: #075985;
}

.practice-card--reactivity {
  background: #f0fdf4;
  border: 1px solid #22c55e;
}

.practice-card--reactivity h4 {
  color: #166534;
  margin: 0 0 0.5rem 0;
}

.practice-card--reactivity ul {
  margin: 0;
  padding-left: 1.25rem;
  color: #15803d;
}

.practice-card--workflow {
  background: #fef3c7;
  border: 1px solid #f59e0b;
}

.practice-card--workflow h4 {
  color: #92400e;
  margin: 0 0 0.5rem 0;
}

.practice-card--workflow ul {
  margin: 0;
  padding-left: 1.25rem;
  color: #92400e;
}

.environment-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 1rem;
}

.env-card {
  padding: 1.5rem;
  border-radius: 8px;
}

.env-card--dev {
  background: #f0f9ff;
  border: 1px solid #0ea5e9;
}

.env-card--dev h4 {
  margin: 0 0 0.5rem 0;
  color: #0369a1;
}

.env-card--dev ul {
  margin: 0;
  padding-left: 1.25rem;
  color: #075985;
}

.env-card--prod {
  background: #f0fdf4;
  border: 1px solid #22c55e;
}

.env-card--prod h4 {
  margin: 0 0 0.5rem 0;
  color: #166534;
}

.env-card--prod ul {
  margin: 0;
  padding-left: 1.25rem;
  color: #15803d;
}
</style>