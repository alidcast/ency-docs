<template lang='pug'>
LessonPage(:lesson="lesson")
</template>

<script>
import LessonPage from '~/components/LessonPage.vue'

export default {
  async asyncData ({ app, params }) {
    return {
      lesson: await app.$content('/vuency').get(params.slug)
    }
  },

  head () {
    return { title: 'Vuency - ' + this.lesson.title }
  },

  components: {
    LessonPage
  }
}
</script>
