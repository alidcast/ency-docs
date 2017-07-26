<template lang='pug'>
  div.guide-page
      GuideToolbar(:toggleContent="toggleContent" :menu="menu")
      nuxt-child(:style="contentStyle")
</template>

<script>
import GuideToolbar from '~components/GuideToolbar'

export default {
  async asyncData ({ app, route, payload }) {
    return {
      showContent: true,
      lessons: await app.$content('/').getAll() || payload
    }
  },

  computed: {
    menu () {
      return organizeSections(this.lessons)
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

function organizeSections (pages) {
  const section = { guide: [], examples: [], api: [] }
  pages.forEach(page => {  // organize
    const pageSection = page.meta.section.replace('/', '')
    if (section[pageSection]) section[pageSection].push(page)
  })
  Object.keys(section).forEach(key => {  // order
    section[key].sort((p1, p2) => p1.order - p2.order)
  })
  return section
}

</script>
