<template>
  <div
    class="app-header sticky top-0 z-40 w-full bg-white border-b border-gray-200 bg-opacity-90"
  >
    <header
      class="max-w-3xl xl:max-w-5xl flex justify-between items-center mx-auto px-4 sm:px-6 xl:px-0"
    >
      <div>
        <NuxtLink to="/" class="text-2xl font-bold"><Logo /></NuxtLink>
      </div>
      <div class="text-base leading-5">
        <a
          href="https://tailwindcss.com/docs"
          class="font-medium text-gray-500 hover:text-gray-700"
          >Sign in</a
        >
      </div>
    </header>
    <!-- <AppSearchInput class="ms-8" /> -->
  </div>
</template>

<style lang="postcss">
.app-header {
  @supports (backdrop-filter: blur(10px)) {
    background-color: rgba(255, 255, 255, 0.3);
  }

  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);

  header {
    height: 72px;
  }
}
</style>
