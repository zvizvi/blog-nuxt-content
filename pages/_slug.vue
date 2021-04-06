<template>
  <div class="antialiased">
    <TheHeader />
    <div class="max-w-3xl mx-auto px-6 xl:max-w-5xl lg:px-0">
      <main>
        <article>
          <header class="pt-6 xl:pb-8">
            <div class="text-center">
              <div>
                <h1
                  class="text-3xl leading-9 font-bold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14"
                >
                  {{ article.title }}
                </h1>
                <p class="mt-4 text-gray-500">{{ article.description }}</p>
              </div>
            </div>
          </header>
          <author
            :author="article.author"
            :updated-at="article.updatedAt"
            class="xl:hidden pt-6 pb-1"
          />
          <div class="xl:flex flex-row-reverse pb-16 xl:pb-20">
            <!-- content author component -->
            <div class="flex-3 divide-y divide-gray-200 xl:pb-0">
              <div class="prose max-w-none pt-6 pb-8">
                <!-- content from markdown -->
                <figure v-if="article.img">
                  <img
                    :src="article.img"
                    class="mx-auto w-full max-h-96 object-cover rounded-md"
                  />
                  <figcaption class="italic text-center"></figcaption>
                </figure>
                <nuxt-content class="text-justify" :document="article" />
              </div>
            </div>
            <footer class="flex-1 text-sm font-medium xl:me-6 leading-5">
              <div class="xl:sticky top-20 divide-y divide-gray-200">
                <author
                  :author="article.author"
                  :updated-at="article.updatedAt"
                  class="hidden xl:block pt-6 pb-10 xl:pt-6"
                />
                <!-- <AppSearchInput /> -->
                <div v-if="article.tags" class="py-8">
                  <span
                    v-for="(tag, id) in article.tags"
                    :key="id"
                    class="text-xs inline-block me-2 mb-2 px-3 py-1 bg-gray-200 text-gray-800 rounded-full font-medium text-ss rounded-fullborder border-light-border dark:border-dark-border transition-colors duration-300 ease-linear"
                  >
                    <NuxtLink :to="`/tag/${tags[tag].slug}`">{{
                      tags[tag].name
                    }}</NuxtLink>
                  </span>
                </div>
                <div class="pt-8">
                  <!-- prevNext component -->
                  <PrevNext :prev="prev" :next="next" class="" />
                </div>
              </div>
            </footer>
          </div>
        </article>
      </main>
    </div>

    <!-- <nav>
      <ul>
        <li
          v-for="link of article.toc"
          :key="link.id"
          :class="{
            'font-semibold': link.depth === 2
          }"
        >
          <nuxtLink
            :to="`#${link.id}`"
            class="hover:underline"
            :class="{
              'py-2': link.depth === 2,
              'ms-2 pb-2': link.depth === 3
            }"
            >{{ link.text }}</nuxtLink
          >
        </li>
      </ul>
    </nav> -->
    <TheFooter />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch();
    const tagsList = await $content('tags')
      .only(['name', 'slug'])
      .where({ name: { $containsAny: article.tags } })
      .fetch();
    const tags = Object.assign({}, ...tagsList.map((s) => ({ [s.name]: s })));
    const [prev, next] = await $content('articles')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch();
    return {
      article,
      tags,
      prev,
      next
    };
  },
  head() {
    return {
      title: ' - ' + this.article?.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article?.description
        }
      ]
    };
  }
};
</script>

<style lang="postcss">
.nuxt-content {
  h1,
  h2,
  h3 {
    &:first-child {
      margin-top: 0;
    }
  }
}

.top-20 {
  top: 5rem;
}
</style>
