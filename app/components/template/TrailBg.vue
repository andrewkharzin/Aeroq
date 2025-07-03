<script setup lang="ts">
interface Trail {
  x: number
  y: number
  length: number
  width: number
  angle: number
  opacity: number
}

const props = withDefaults(defineProps<{
  trailCount?: number
  color?: string
  speed?: 'slow' | 'normal' | 'fast'
  width?: { min: number, max: number }
}>(), {
  trailCount: 20,
  color: 'rgba(255, 255, 255, 0.7)',
  speed: 'normal',
  width: () => ({
    min: 1,
    max: 3
  })
})

// Генерация случайных следов
const generateTrails = (count: number): Trail[] => {
  return Array.from({ length: count }, () => {
    const length = Math.random() * 100 + 50; // Длина следа
    const angle = Math.random() * 30 - 15; // Угол наклона следа (-15 до 15 градусов)

    return {
      x: Math.floor(Math.random() * 2000),
      y: Math.floor(Math.random() * 2000),
      length,
      width: Math.random() * (props.width.max - props.width.min) + props.width.min,
      angle,
      opacity: Math.random() * 0.5 + 0.3 // Начальная прозрачность
    }
  })
}

// Конфигурация скоростей
const speedMap = {
  slow: { duration: 120, ratio: 0.3 },
  normal: { duration: 90, ratio: 0.4 },
  fast: { duration: 60, ratio: 0.3 }
}

// Генерация и хранение следов
const trails = useState<{ slow: Trail[], normal: Trail[], fast: Trail[] }>('trails', () => {
  return {
    slow: generateTrails(Math.floor(props.trailCount * speedMap.slow.ratio)),
    normal: generateTrails(Math.floor(props.trailCount * speedMap.normal.ratio)),
    fast: generateTrails(Math.floor(props.trailCount * speedMap.fast.ratio))
  }
})

// Слои следов с разными скоростями
const trailLayers = computed(() => [
  { trails: trails.value.fast, ...speedMap.fast },
  { trails: trails.value.normal, ...speedMap.normal },
  { trails: trails.value.slow, ...speedMap.slow }
])
</script>

<template>
  <div class="absolute pointer-events-none z-[-1] inset-0 overflow-hidden bg-gradient-to-b from-blue-900 to-indigo-950">
    <div class="trails-container size-full relative">
      <div
        v-for="(layer, index) in trailLayers"
        :key="index"
        class="trail-layer absolute inset-0"
        :style="{
          '--trail-duration': `${layer.duration}s`
        }"
      >
        <div
          v-for="(trail, trailIndex) in layer.trails"
          :key="trailIndex"
          class="trail absolute"
          :style="{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
            width: `${trail.length}px`,
            height: `${trail.width}px`,
            backgroundColor: props.color,
            opacity: trail.opacity,
            transform: `rotate(${trail.angle}deg)`,
            transformOrigin: 'left center'
          }"
        >
          <div class="trail-fade" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.trails-container {
  background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
  overflow: hidden;
}

.trail {
  border-radius: 1px;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  animation: trailRising linear infinite;
  animation-duration: var(--trail-duration);
  will-change: transform;
}

.trail::before {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  width: 20px;
  height: 100%;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, var(--trail-color) 100%);
}

.trail::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 100%;
  background: linear-gradient(90deg, var(--trail-color) 0%, rgba(255,255,255,0) 100%);
}

.trail-fade {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(0deg, rgba(255,255,255,0) 0%, var(--trail-color) 30%, var(--trail-color) 70%, rgba(255,255,255,0) 100%);
}

@keyframes trailRising {
  0% {
    transform: translateY(0) rotate(var(--trail-angle));
    opacity: var(--trail-opacity);
  }
  70% {
    opacity: 0.2;
  }
  100% {
    transform: translateY(-2000px) rotate(var(--trail-angle));
    opacity: 0;
  }
}
</style>