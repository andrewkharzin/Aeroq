<script setup lang="ts">
const colorMode = useColorMode()

definePageMeta({
  layout: 'home'
})

const color = computed(() => colorMode.value === 'dark' ? '#171717' : 'white')

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})
const { isLoading } = useLoadingIndicator()
const appear = ref(false)
const appeared = ref(false)

useSeoMeta({
  ogImage: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2xhbmRpbmctdGVtcGxhdGUubnV4dC5kZXYiLCJpYXQiOjE3Mzk0NjMzNzV9.ja2nUDVOoIFvyaMmg9Jn51uNMoYYt4WA1KWUQBWwUPo.jpg?theme=light',
  twitterImage: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2xhbmRpbmctdGVtcGxhdGUubnV4dC5kZXYiLCJpYXQiOjE3Mzk0NjMzNzV9.ja2nUDVOoIFvyaMmg9Jn51uNMoYYt4WA1KWUQBWwUPo.jpg?theme=light',
  twitterCard: 'summary_large_image'
})

onMounted(() => {
  setTimeout(() => {
    appear.value = true
    setTimeout(() => {
      appeared.value = true
    }, 1000)
  }, 0)
})
</script>

<template>
  <UApp :toaster="{ expand: false }">
    <TemplateAppHeader />

    <UMain class="relative">
      <TemplateHeroBackground
        class="absolute w-full -top-px transition-all text-primary shrink-0"
        :class="[
          isLoading ? 'animate-pulse' : (appear ? '' : 'opacity-0'),
          appeared ? 'duration-[400ms]': 'duration-1000'
        ]"
      />
      <UPageHero
        description="Some description"
        :ui="{ container: 'md:pt-18 lg:pt-20' }"
      >
        <template #title>
          <MDC
            value="AEROQ"
            class="*:leading-11 sm:*:leading-19 max-w-3xl mx-auto font-mono"
          />
        </template>
      </UPageHero>

      <NuxtPage />
    </UMain>

    <TemplateAppFooter />
  </UApp>
</template>
