<template>
  <div class="space-y-8">
    <div v-if="next">
      <h2
        class="text-xs tracking-wide uppercase text-gray-500 flex items-center space-x-2"
      >
        <span>Next Article</span>
        <span
          ><svg viewBox="0 0 6 4" class="w-3">
            <polygon
              fill="currentColor"
              points="0 2.33 4.72 2.33 3.53 3.53 4 4 6 2 4 0 3.53 0.47 4.72 1.67 0 1.67 0 2.33"
            ></polygon></svg
        ></span>
      </h2>
      <div class="text-teal-500 hover:text-teal-600">
        <NuxtLink
          :to="{ name: 'slug', params: { slug: next.slug } }"
          class="font-bold hover:underline"
        >
          {{ next.title }}
        </NuxtLink>
      </div>
    </div>
    <span v-else>&nbsp;</span>
    <div v-if="prev">
      <h2
        class="text-xs tracking-wide uppercase text-gray-500 flex items-center space-x-2"
      >
        <span>Previous Article</span>
        <span
          ><svg viewBox="0 0 6 4" class="w-3 transform rotate-180">
            <polygon
              fill="currentColor"
              points="0 2.33 4.72 2.33 3.53 3.53 4 4 6 2 4 0 3.53 0.47 4.72 1.67 0 1.67 0 2.33"
            ></polygon></svg
        ></span>
      </h2>
      <div class="text-teal-500 hover:text-teal-600">
        <NuxtLink
          :to="{ name: 'slug', params: { slug: prev.slug } }"
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
