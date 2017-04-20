<template lang='pug'>
  div.guide-page#guide(ref="guide")
      GuideToolbar
      GuideContent(:lesson="currentLesson")
</template>
<script>
import GuideContent from '~components/GuideContent'
import GuideToolbar from '~components/GuideToolbar'
import { toHeading } from '~utilities/to-transforms'

export default {
  asyncData: ({ params }) => ({
    currentLesson: params.slug || 'introduction'
  }),

  head () {
    return { title: 'Vuency - ' + toHeading(this.currentLesson) }
  },

  watch: {
    $route (to, from) {
      console.log(to)
    }
  },

  components: {
    GuideContent,
    GuideToolbar
  }
}
</script>
