<template>
  <dl>
    <dt class="sr-only">Authors</dt>
    <dd>
      <ul
        class="flex justify-center xl:block space-x-8 sm:space-x-12 xl:space-x-0 xl:space-y-4"
      >
        <li class="flex items-center space-x-2">
          <img
            v-if="author.img"
            :src="author.img"
            class="w-10 h-10 rounded-full"
          />
          <dl class="text-sm font-medium leading-5 whitespace-no-wrap">
            <dt class="sr-only">Name</dt>
            <dd class="text-gray-900">
              <NuxtLink :to="`/blog/author/${author.name}`"
                >{{ author.name }}
              </NuxtLink>
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
    }
  }
};
</script>
