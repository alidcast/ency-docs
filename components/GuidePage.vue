<template lang='pug'>
  div.guide-page
    GuideToolbar(:toggleContent="toggleContent" :menu="menu")
    div(:style="contentStyle")
      slot
</template>

<script>
import GuideToolbar from '~components/GuideToolbar'

export default {
  props: {
    name: { type: String, required: true },
    pages: { type: Array, required: true }
  },

  data: () => ({
    showContent: true
  }),

  computed: {
    menu () {
      return this.pages.map(page => {
        page.path = this.name + page.permalink
        return page
      })
    },

    contentStyle () {
      return { 'display': this.showContent ? 'block' : 'none' }
    }
  },

  methods: {
    toggleContent () {
      this.showContent = !this.showContent
    }
  },

  components: {
    GuideToolbar
  }
}
</script>
