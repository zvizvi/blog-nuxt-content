<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <div
      class="tag-page flex-1 w-full max-w-3xl xl:max-w-5xl mx-auto px-4 lg:px-0 py-8 xl:pb-20"
    >
      <div class="flex flex-col">
        <div class="relative pb-6">
          <p>
            <NuxtLink
              to="/"
              class="hover:underline inline-flex items-center space-s-2"
            >
              <span
                ><svg
                  viewBox="0 0 6 4"
                  class="w-3 transform rotate-180 rtl:rotate-0"
                >
                  <polygon
                    fill="currentColor"
                    points="0 2.33 4.72 2.33 3.53 3.53 4 4 6 2 4 0 3.53 0.47 4.72 1.67 0 1.67 0 2.33"
                  ></polygon></svg
              ></span>
              <span>Back to All Articles</span>
            </NuxtLink>
          </p>
          <h1 class="text-4xl py-4 font-bold uppercase">
            {{ tag.name }}
          </h1>
          <p class="mb-4">{{ tag.description }}</p>

          <nuxt-content :document="tag" />
        </div>
      </div>

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

              <span class="flex mt-auto pt-6 items-center space-s-3">
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
    </div>
    <TheFooter />
  </div>
</template>

<script>
import { upperFirst } from 'lodash';

export default {
  async asyncData({ $content, params }) {
    const tags = await $content('tags')
      .where({ slug: { $contains: params.tag } })
      .limit(1)
      .fetch();
    const tag = tags.length > 0 ? tags[0] : {};
    const articles = await $content('articles', params.slug)
      .where({ tags: { $contains: tag.name } })
      .sortBy('createdAt', 'asc')
      .fetch();
    return {
      articles,
      tag
    };
  },
  head() {
    return {
      title: ` / Tags / ${upperFirst(this.tag?.name)}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.tag?.description
        }
      ]
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
.tag-page .article-card {
  grid-column: span 6;

  @media (min-width: 640px) {
    grid-column: span 3;

    /* full width for the last post */
    &:nth-child(2n -1):last-child {
      grid-column: span 6;
    }
  }
}
</style>
