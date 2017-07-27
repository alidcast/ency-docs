<template lang='pug'>
  div.guide-page
    GuidePage(
      contentLabel="Ency.js"
      routeName="/ency"
      :pages="lessons"
    )
      nuxt-child
</template>

<script>
import GuidePage from '~components/GuidePage'

export default {
  asyncData: async({ app, payload }) => ({
    lessons: await app.$content('/ency').getAll() || payload
  }),
  components: {
    GuidePage
  }
}
</script>
