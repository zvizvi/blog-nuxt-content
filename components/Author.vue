<template>
  <dl>
    <dt class="sr-only">Authors</dt>
    <dd>
      <ul
        class="flex justify-center xl:block space-x-8 sm:space-x-12 xl:space-x-0 xl:space-y-6"
      >
        <li class="flex items-center space-x-3">
          <NuxtLink :to="`/author/${author.name}`">
            <img
              v-if="author.img"
              :src="author.img"
              class="w-10 h-10 rounded-full object-cover"
            />
          </NuxtLink>
          <dl class="text-sm font-medium leading-5 whitespace-no-wrap">
            <dt class="sr-only">Name</dt>
            <dd class="text-gray-900">
              <NuxtLink :to="`/author/${author.name}`"
                >{{ author.name }}
              </NuxtLink>
            </dd>
            <dt class="sr-only">Published on</dt>
            <dd v-if="updatedAt" class="font-normal text-gray-600 text-sm">
              <time :datetime="formatDate(updatedAt, true)">{{
                formatDate(updatedAt)
              }}</time>
            </dd>
            <dt class="sr-only">Twitter</dt>
            <dd>
              <a
                v-if="author.twitterLink && author.twitterName"
                :href="author.twitterLink"
                class="text-teal-500 hover:text-teal-600"
                >@{{ author.twitterName }}</a
              >
            </dd>
          </dl>
        </li>
        <li v-if="author.bio" class="hidden xl:block">
          <p class="text-gray-400">{{ author.bio }}</p>
        </li>
      </ul>
    </dd>
  </dl>
</template>

<script>
export default {
  props: {
    author: {
      type: Object,
      required: true
    },
    updatedAt: {
      type: String,
      default: undefined
    }
  },
  methods: {
    formatDate(date, iso) {
      if (iso) {
        return new Date(date).toISOString();
      }
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('en', options);
    }
  }
};
</script>
