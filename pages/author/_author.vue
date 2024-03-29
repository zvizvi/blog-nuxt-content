<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <div
      class="author-page flex-1 w-full max-w-3xl xl:max-w-5xl mx-auto px-4 lg:px-0 py-8 xl:pb-20"
    >
      <div class="pb-6">
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
        <div class="flex py-6 space-s-6 items-center">
          <img
            :src="author.img"
            :alt="author.name"
            class="w-36 h-36 rounded-full object-cover"
          />
          <div class="flex flex-col">
            <h1 class="text-4xl py-4 font-bold uppercase">
              {{ author.name }}
            </h1>
            <p class="mb-4">{{ author.bio }}</p>
            <!-- eslint-disable -->
            <p
              v-if="author.signature"
              class="mb-4 text-sm p-1 border-t border-gray-300"
              v-html="$md.render(author.signature)"
            ></p>
            <!-- eslint-enable -->
          </div>
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
              <p class="text-gray-600 text-sm">
                {{ article.description }}
              </p>

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
export default {
  async asyncData({ $content, params }) {
    const articles = await $content('articles', params.slug)
      .where({
        'author.name': {
          $regex: [params.author, 'i']
        }
      })
      .without('body')
      .sortBy('createdAt', 'asc')
      .fetch();
    const author = articles?.[0]?.author;
    return {
      articles,
      author
    };
  },
  head() {
    return {
      title: ` / Authors / ${this.author?.name}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.author?.bio
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
.author-page .article-card {
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
