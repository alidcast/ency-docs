<template lang='pug'>
  div.guide-page
    GuidePage(name="/vuency" :pages="lessons")
      nuxt-child
</template>

<script>
import GuidePage from '~components/GuidePage'

export default {
  asyncData: async({ app, payload }) => ({
    lessons: await app.$content('/vuency').getAll() || payload
  }),
  components: {
    GuidePage
  }
}
</script>
