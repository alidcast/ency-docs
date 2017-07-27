<template lang='pug'>
LessonPage(:lesson="lesson")
</template>

<script>
import LessonPage from '~components/LessonPage.vue'

export default {
  async asyncData ({ app, route, payload }) {
    return {
      lesson: await app.$content('/ency').get(route.params.slug) || payload
    }
  },

  head () {
    return { title: 'Ency - ' + this.lesson.title }
  },

  components: {
    LessonPage
  }
}
</script>
