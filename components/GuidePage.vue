<template lang='pug'>
  div.guide-page
    GuideToolbar(
      :toggleContent="toggleContent"
      :menu="pages"
      :title="contentLabel"
    )
    div(:style="contentStyle")
      slot
</template>

<script>
import GuideToolbar from '~/components/GuideToolbar'

export default {
  props: {
    contentLabel: { type: String, required: true },
    routeName: { type: String, required: true },
    pages: { type: Array, required: true }
  },

  data: () => ({
    showContent: true
  }),

  computed: {
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
