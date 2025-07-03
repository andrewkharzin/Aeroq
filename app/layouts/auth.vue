<template>
  <div class="h-screen flex items-center justify-center px-4">
    <UPageHero title="AEROQ">
      <template #description>
        <span class="mr-0.8 text-sm font-mono tracking-[1.3em] text-gray-500 dark:text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-sky-600 uppercase">
          <USeparator />
          DASHBOARD
        </span>
      </template>
      <template #top>
        <div class="absolute rounded-full dark:bg-primary blur-[300px] size-60 sm:size-80 transform -translate-x-1/2 left-1/2 -translate-y-80" />

        <TemplateStarsBg />
        <!-- <TemplateTrailBg /> -->
      </template>
    </UPageHero>
    <UButton
      icon="i-lucide-chevron-left"
      to="/"
      size="xl"
      color="neutral"
      variant="subtle"
      class="absolute left-8 top-8 rounded-full z-10"
    />

    <UPageCard
      variant="subtle"
      class="max-w-sm w-full"
    >
      <slot />
    </UPageCard>
  </div>
</template>