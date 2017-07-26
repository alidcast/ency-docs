<template lang="pug">
  div.menu-container
    ul(v-for="section in Object.keys(menu)")
      template
        h5.group-heading {{ section }}
        li(v-for="lesson in menu[section]")
          nuxt-link.section-heading(:to="'/guide' + lesson.permalink") {{ lesson.title }}
</template>

<script>
export default {
  props: {
    menu: { type: Object, required: true }
  }
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
