<template>
  <div>
    <TheHeader />
    <div class="max-w-3xl xl:max-w-5xl mx-auto px-4 lg:px-0 py-8">
      <ul class="grid grid-cols-6 gap-5">
        <li
          v-for="article of articles"
          :key="article.slug"
          class="article-card overflow-hidden border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow duration-150 ease-in-out"
        >
          <NuxtLink
            :to="{ name: 'blog-slug', params: { slug: article.slug } }"
            class="flex flex-col h-full"
          >
            <img
              v-if="article.img"
              class="h-48 object-cover rounded-t-md"
              :src="article.img"
            />

            <div class="p-6 flex-1">
              <h2 class="font-bold">{{ article.title }}</h2>
              <p>by {{ article.author.name }}</p>
              <p class="font-bold text-gray-600 text-sm">
                {{ article.description }}
              </p>
            </div>
          </NuxtLink>
        </li>
      </ul>
      <h3 class="mb-4 font-bold text-2xl uppercase text-center">Topics</h3>
      <ul class="flex flex-wrap mb-4 text-center">
        <li
          v-for="tag of tags"
          :key="tag.slug"
          class="xs:w-full md:w-1/3 lg:flex-1 px-2 text-center"
        >
          <NuxtLink :to="`/blog/tag/${tag.slug}`" class="">
            <p
              class="font-bold text-gray-600 uppercase tracking-wider font-medium text-ss"
            >
              {{ tag.name }}
            </p>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <footer class="flex justify-center border-gray-500 border-t-2">
      <p class="mt-4">
        Created by
        <a
          href="https://twitter.com/debs_obrien"
          class="font-bold hover:underline"
          >Debbie O'Brien</a
        >
        at NuxtJS. See the
        <a
          href="https://nuxtjs.org/blog/creating-blog-with-nuxt-content"
          class="font-bold hover:underline"
          >tutorial</a
        >
        for how to build it.
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const articles = await $content('articles', params.slug)
      .only(['title', 'description', 'img', 'slug', 'author'])
      .sortBy('createdAt', 'desc')
      .fetch();
    const tags = await $content('tags', params.slug)
      .only(['name', 'description', 'img', 'slug'])
      .sortBy('createdAt', 'asc')
      .fetch();
    return {
      articles,
      tags
    };
  }
};
</script>

<style lang="postcss">
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
  }
}
</style>
