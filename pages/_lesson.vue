<template lang='pug'>
  div.guide-page
      GuideToolbar(:toggleContent="toggleContent")
      div.content(:style="contentStyle")
        //- TODO temporary until nuxtent-body is fixed.
        h1 {{ lesson.title }}
        nuxtent-body.content(v-if="isObject(lesson.body)" :body="lesson.body")
        div(v-else v-html="lesson.body")
</template>

<script>
import GuideToolbar from '~components/GuideToolbar'
import { toHeading } from '~utilities/to-transforms'

export default {
  async asyncData ({ app, route, payload }) {
    return {
      showContent: true,
      lesson: await app.$content('/').get(route.path) || payload
    }
  },

  head () {
    return { title: 'Ency - ' + toHeading(this.lesson.title) }
  },

  computed: {
    contentStyle () {
      return { 'display': this.showContent ? 'block' : 'none' }
    }
  },

  methods: {
    isObject (body) {
      return typeof body === 'object'
    },
    toggleContent () {
      this.showContent = !this.showContent
    }
  },

  components: {
    GuideToolbar
  }
}
</script>

<style lang="sass">
@import "../assets/sass/util.sass"

.content
  max-width: 42rem
  padding: 1rem
  margin: 0 auto
  +media('>desktop')
    margin-left: 21rem
  // general content styles
  h1
    margin-bottom: 1rem
  h2
    // underline
    border-bottom: 1px solid $primary-3
    padding-bottom: .75rem
    // space out
    margin-top: 2rem
    margin-bottom: 1rem

div.showcase
  background-color: #f9f9f9
  margin: 2rem 0 2rem 0
  padding: 1rem

p.warning, p.tip, p.danger
  padding: 12px 24px 12px 20px
  margin: 2em 0
  border-left: 4px solid
  position: relative
  border-bottom-right-radius: 2px
  border-top-right-radius: 2px
  &:before
    content: "!"
    position: absolute
    top: 14px
    left: -12px
    color: #fff
    width: 20px
    height: 20px
    border-radius: 100%
    text-align: center
    line-height: 20px
    font-weight: bold
    font-family: 'Dosis', 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif
  &.no-bg
    background-color: #f8f8f8
p.warning
  border-left-color: #f7d24c
  background-color: #fefbed
  &:before
    background-color: #f7d24c

p.danger
  $red: #f66
  border-left-color:  $red
  background-color: rgba(255, 102, 102, 0.06)
  &:before
    background-color: $red
p.tip
  $green: #3c763d
  border-left-color: $green
  background-color: rgba(241, 249, 241, 0.83)
  &:before
    background-color: $green
</style>
