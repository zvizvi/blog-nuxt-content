<template>
  <div class="space-y-8">
    <div>
      <h2 class="text-xs tracking-wide uppercase text-gray-500">
        Next Article
      </h2>
      <div class="text-teal-500 hover:text-teal-600">
        <NuxtLink
          v-if="next"
          :to="{ name: 'blog-slug', params: { slug: next.slug } }"
          class="font-bold hover:underline"
        >
          {{ next.title }}
        </NuxtLink>
        <span v-else>&nbsp;</span>
      </div>
    </div>
    <div>
      <h2 class="text-xs tracking-wide uppercase text-gray-500">
        Previous Article
      </h2>
      <div class="text-teal-500 hover:text-teal-600">
        <NuxtLink
          v-if="prev"
          :to="{ name: 'blog-slug', params: { slug: prev.slug } }"
          class="text-primary font-bold hover:underline"
        >
          {{ prev.title }}
        </NuxtLink>
        <span v-else>&nbsp;</span>
      </div>
    </div>
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
