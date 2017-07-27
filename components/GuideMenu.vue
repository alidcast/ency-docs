<template lang="pug">
  div.menu-container
    template(v-for="section in Object.keys(categorizedMenu)")
      ul(v-if="categorizedMenu[section].length > 0")
        h5.group-heading {{ section }}
        li(v-for="lesson in categorizedMenu[section]")
          nuxt-link.section-heading(:to="lesson.path") {{ lesson.title }}
</template>

<script>
export default {
  props: {
    menu: { type: Array, required: true }
  },
  computed: {
    categorizedMenu () {
      return organizeSections(this.menu)
    }
  }
}

function organizeSections (pages) {
  const menu = { guide: [], examples: [], api: [] }
  pages.forEach(page => {  // organize
    const pageSection = page.meta.section.replace('/', '')
    if (menu[pageSection]) menu[pageSection].push(page)
  })
  Object.keys(menu).forEach(key => {  // order
    menu[key].sort((p1, p2) => p1.order - p2.order)
  })
  return menu
}
</script>

<style lang="sass">
@import "../assets/sass/util.sass"

.menu-container
  ul
    list-style: none
    padding-left: 0
  a
    color: inherit
    &:hover
      text-decoration: none

.group-heading
  margin-bottom: .75rem
  font-size: .9rem
  font-weight: 500
  text-transform: uppercase
  color: $primary-1
.section-heading
  display: block
  margin-bottom: .5rem
</style>
