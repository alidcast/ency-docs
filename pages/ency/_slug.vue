<template lang='pug'>
LessonPage(:lesson="lesson")
</template>

<script>
import LessonPage from '~/components/LessonPage.vue'

export default {
  async asyncData ({ app, params }) {
    return {
      lesson: await app.$content('/ency').get(params.slug)
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
