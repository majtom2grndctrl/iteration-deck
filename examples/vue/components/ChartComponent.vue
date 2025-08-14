<template>
  <div class="chart-container">
    <div v-if="variant === 'simple'" class="chart chart--simple">
      <h3>Quick Stats</h3>
      <div class="stat-value">
        {{ data.users.toLocaleString() }} users
      </div>
      <div class="stat-growth" :class="growthClass">
        {{ formatGrowth(data.growth) }}
      </div>
    </div>

    <div v-else-if="variant === 'detailed'" class="chart chart--detailed">
      <div class="chart-header">
        <h3>Dashboard Metrics</h3>
        <button 
          @click="handleRefresh" 
          :disabled="isRefreshing"
          class="refresh-button"
          :class="{ 'refresh-button--loading': isRefreshing }"
        >
          {{ isRefreshing ? '⟳' : '🔄' }}
        </button>
      </div>
      
      <div class="metrics-grid">
        <div class="metric">
          <div class="metric-label">Total Users</div>
          <div class="metric-value">{{ data.users.toLocaleString() }}</div>
        </div>
        <div class="metric">
          <div class="metric-label">Revenue</div>
          <div class="metric-value metric-value--revenue">
            ${{ data.revenue.toLocaleString() }}
          </div>
        </div>
        <div class="metric">
          <div class="metric-label">Growth</div>
          <div class="metric-value" :class="growthClass">
            {{ formatGrowth(data.growth) }}
          </div>
        </div>
      </div>
      
      <div class="last-updated">
        Last updated: {{ formatTime(data.lastUpdate) }}
      </div>
    </div>

    <div v-else-if="variant === 'interactive'" class="chart chart--interactive">
      <h3>Interactive Performance Chart</h3>
      
      <div 
        class="chart-visual"
        @click="handleChartClick"
      >
        <div class="chart-content">
          📊 Live Chart
          <div class="chart-data">{{ data.users.toLocaleString() }} users</div>
        </div>
        
        <!-- Simulated data points -->
        <div 
          v-for="(point, index) in dataPoints" 
          :key="index"
          class="data-point"
          :style="{ 
            left: `${point.x}%`, 
            top: `${point.y}%`,
            backgroundColor: point.color 
          }"
          @click.stop="handleDatapointClick(point, index)"
        />
      </div>
      
      <div class="chart-footer">
        <div class="chart-legend">
          <span class="legend-item">
            <span class="legend-color legend-color--users"></span>
            Users: {{ data.users.toLocaleString() }}
          </span>
          <span class="legend-item">
            <span class="legend-color legend-color--revenue"></span>
            Revenue: ${{ data.revenue.toLocaleString() }}
          </span>
          <span class="legend-item" :class="growthClass">
            {{ data.growth >= 0 ? '↗' : '↘' }} {{ Math.abs(data.growth).toFixed(1) }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive, watch } from 'vue'

interface Props {
  variant: 'simple' | 'detailed' | 'interactive'
  data: {
    users: number
    revenue: number
    growth: number
    lastUpdate: Date
  }
}

const props = defineProps<Props>()

const emit = defineEmits<{
  refresh: []
  datapointClick: [point: DataPoint, index: number]
}>()

interface DataPoint {
  x: number
  y: number
  color: string
  value: number
}

const isRefreshing = ref(false)

// Generate random data points for interactive chart
const dataPoints = reactive<DataPoint[]>([])

const generateDataPoints = () => {
  dataPoints.splice(0)
  for (let i = 0; i < 8; i++) {
    dataPoints.push({
      x: Math.random() * 80 + 10,
      y: Math.random() * 60 + 20,
      color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)`,
      value: Math.random() * 1000
    })
  }
}

// Initialize data points
generateDataPoints()

const growthClass = computed(() => ({
  'growth--positive': props.data.growth >= 0,
  'growth--negative': props.data.growth < 0
}))

const formatGrowth = (growth: number) => {
  const sign = growth >= 0 ? '+' : ''
  return `${sign}${growth.toFixed(1)}%`
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString()
}

const handleRefresh = async () => {
  isRefreshing.value = true
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  emit('refresh')
  generateDataPoints()
  isRefreshing.value = false
}

const handleChartClick = () => {
  console.log('Chart clicked - generating new data points')
  generateDataPoints()
}

const handleDatapointClick = (point: DataPoint, index: number) => {
  console.log(`Datapoint ${index} clicked:`, point)
  emit('datapointClick', point, index)
}

// Regenerate data points when data changes
watch(() => props.data.users, () => {
  generateDataPoints()
}, { flush: 'post' })
</script>

<style scoped>
.chart-container {
  min-width: 250px;
}

.chart {
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chart--simple {
  text-align: center;
  min-width: 250px;
}

.chart--simple h3 {
  margin: 0 0 1rem 0;
  color: #1f2937;
  font-size: 18px;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #3b82f6;
  margin-bottom: 0.5rem;
}

.stat-growth {
  font-size: 16px;
  font-weight: 600;
}

.chart--detailed {
  min-width: 300px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.chart-header h3 {
  margin: 0;
  color: #1f2937;
}

.refresh-button {
  background: #f3f4f6;
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
}

.refresh-button:hover {
  background: #e5e7eb;
}

.refresh-button--loading {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.metrics-grid {
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;
}

.metric {
  text-align: left;
}

.metric-label {
  font-size: 12px;
  color: #6b7280;
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.metric-value {
  font-size: 20px;
  font-weight: bold;
  color: #1f2937;
}

.metric-value--revenue {
  color: #059669;
}

.last-updated {
  font-size: 12px;
  color: #9ca3af;
  text-align: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
}

.chart--interactive {
  min-width: 350px;
}

.chart--interactive h3 {
  margin: 0 0 1rem 0;
  color: #1f2937;
}

.chart-visual {
  height: 200px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 4px;
  margin-bottom: 1rem;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.chart-visual:hover {
  transform: scale(1.02);
}

.chart-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
  font-size: 18px;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.chart-data {
  font-size: 14px;
  margin-top: 0.5rem;
  opacity: 0.9;
}

.data-point {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.data-point:hover {
  transform: scale(1.5);
  z-index: 10;
}

.chart-footer {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.chart-legend {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 12px;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.legend-color--users {
  background: #3b82f6;
}

.legend-color--revenue {
  background: #059669;
}

.growth--positive {
  color: #059669;
}

.growth--negative {
  color: #dc2626;
}
</style>