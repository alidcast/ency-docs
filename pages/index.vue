<template lang='pug'>
  div.home-container
    LandingPage
    div.guide-page#guide(ref="guide")
      GuideToolbar(:class="{ 'fixed-toolbar': isGuide }")
      GuideSection(
        :class="{ 'shifted-section': isGuide }"
        :lesson="currentLesson"
      )
</template>
<script>
import LandingPage from '~components/LandingPage'
import GuideSection from '~components/GuideSection'
import GuideToolbar from '~components/GuideToolbar'
import { toHeading } from '~utilities/to-transforms'

export default {
  asyncData: ({ params }) => ({
    currentLesson: params.hash || 'introduction',
    isGuide: false
  }),

  head () {
    return { title: 'Vuency - ' + toHeading(this.currentLesson) }
  },

  watch: {
    $route (to, from) {
      this.currentLesson = to.hash
    }
  },

  tasks (t) {
    return t(function * onScroll () {
      // var window_top = $(window).scrollTop();
      // var div_top = $('#content-anchor').offset().top;
      const guide = this.$refs.guide
      const topPos = guide.getBoundingClientRect().top + window.scrollY

      if (topPos <= window.scrollY) this.isGuide = true
      else this.isGuide = false
    }).flow('restart', { delay: 40 })
  },

  created () {
    const { onScroll } = this
    if (process.BROWSER_BUILD) { // if (window.innerWidth > 759)
      window.addEventListener('scroll', onScroll.run.bind(onScroll))
    }
  },

  destroyed () {
    const { onScroll } = this
    if (process.BROWSER_BUILD) window.removeEventListener('scroll', onScroll.run.bind(onScroll))
  },

  components: {
    LandingPage,
    GuideSection,
    GuideToolbar
  }
}
</script>

<style lang='sass'>
@import "../assets/sass/util.sass"

.guide-page
  margin-top: 3rem
.fixed-toolbar
  position: fixed
  top: 0
  transition: position 0.2s ease-in-out
.shifted-section
  margin-left: 20rem
</style>
