<template>
  <div class="space-y-8">
    <div v-if="next">
      <h2 class="text-xs tracking-wide uppercase text-gray-500">
        Next Article <span>→</span>
      </h2>
      <div class="text-teal-500 hover:text-teal-600">
        <NuxtLink
          :to="{ name: 'blog-slug', params: { slug: next.slug } }"
          class="font-bold hover:underline"
        >
          {{ next.title }}
        </NuxtLink>
      </div>
    </div>
    <span v-else>&nbsp;</span>
    <div v-if="prev">
      <h2 class="text-xs tracking-wide uppercase text-gray-500">
        Previous Article <span>←</span>
      </h2>
      <div class="text-teal-500 hover:text-teal-600">
        <NuxtLink
          :to="{ name: 'blog-slug', params: { slug: prev.slug } }"
          class="text-primary font-bold hover:underline"
        >
          {{ prev.title }}
        </NuxtLink>
      </div>
    </div>
    <span v-else>&nbsp;</span>
  </div>
</template>

<script>
export default {
  props: {
    prev: {
      type: Object,
      default: () => null
    },
    next: {
      type: Object,
      default: () => null
    }
  }
};
</script>
