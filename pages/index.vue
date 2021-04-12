<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <div class="flex-1 w-full max-w-3xl xl:max-w-5xl mx-auto px-4 lg:px-0 py-8">
      <ul class="grid grid-cols-6 gap-5">
        <li
          v-for="article of articles"
          :key="article.slug"
          class="article-card overflow-hidden border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow duration-150 ease-in-out"
        >
          <NuxtLink
            :to="{ name: 'slug', params: { slug: article.slug } }"
            class="flex flex-col h-full"
          >
            <img
              v-if="article.img"
              class="h-48 object-cover rounded-t-md"
              :src="article.img"
            />

            <div class="p-6 flex-1 flex flex-col">
              <h2 class="text-lg font-semibold">{{ article.title }}</h2>
              <p class="text-gray-600 text-sm">{{ article.description }}</p>

              <span
                v-if="article.author"
                class="flex mt-auto pt-6 items-center space-s-3"
              >
                <img
                  v-if="article.author.img"
                  :src="article.author.img"
                  class="w-8 h-8 rounded-full object-cover"
                />
                <div class="flex flex-col">
                  <span
                    class="text-sm font-medium text-gray-900 leading-5 whitespace-no-wrap"
                  >
                    {{ article.author.name }}
                  </span>
                  <span class="text-gray-600 text-xs">{{
                    formatDate(article.updatedAt)
                  }}</span>
                </div>
              </span>
            </div>
          </NuxtLink>
        </li>
      </ul>
      <ul class="flex flex-wrap justify-between mt-14 mb-4 text-center gap-x-2">
        <li v-for="tag of tags" :key="tag.slug" class="text-center">
          <NuxtLink :to="`/tag/${tag.slug}`">
            <span
              class="text-xs inline-block mb-2 px-3 py-1 bg-gray-200 text-gray-800 rounded-full font-medium text-ss rounded-fullborder border-light-border dark:border-dark-border transition-colors duration-300 ease-linear whitespace-nowrap"
              >{{ tag.name }}</span
            >
          </NuxtLink>
        </li>
      </ul>
    </div>
    <TheFooter />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const articles = await $content('articles', params.slug)
      .only(['title', 'description', 'updatedAt', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'desc')
      .fetch();
    const tags = await $content('tags', params.slug)
      .only(['name', 'description', 'img', 'slug'])
      .sortBy('name', 'asc')
      .fetch();
    return {
      articles,
      tags
    };
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('en', options);
    }
  }
};
</script>

<style lang="postcss" scoped>
.article-card {
  grid-column: span 6;

  @media (min-width: 640px) {
    grid-column: span 3;
  }

  @media (min-width: 1024px) {
    grid-column: span 2;

    &:nth-child(7n -6),
    &:nth-child(7n -5) {
      grid-column: span 3;
    }

    &:nth-child(14n -8),
    &:nth-child(14n) {
      grid-column: span 4;
    }

    /* full width for the last post */
    &:nth-child(7n -4),
    &:nth-child(7n -6),
    &:nth-child(7n -8) {
      &:last-child {
        grid-column: span 6;
      }
    }

    &:nth-child(7n -3):last-child {
      grid-column: span 4;
    }
  }

  @media (min-width: 640px) and (max-width: 1023px) {
    &:nth-child(2n -1):last-child {
      grid-column: span 6;
    }
  }
}
</style>
