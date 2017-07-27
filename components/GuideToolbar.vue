<template lang="pug">
  div.toolbar.responsive-toolbar
    div.toolbar-masthead
      a.site-title(href="/") {{ title }}
      p.site-slogan Concurrency management <span> for {{ frameworkName }}. </span>

    div.toolbar-menu
      button.mobile-menu-button(@click="toggleDisplay") Guide
      GuideMenu(class="main-menu" :style="menuStyle" :menu="menu")

    div.toolbar-links
      a.github-link(href="https://github.com/alidcastano/vuency")
        span.icon-github
</template>

<script>
import GuideMenu from '~components/GuideMenu'

export default {
  props: {
    title: { type: String, required: true },
    menu: { type: Array, required: true },
    toggleContent: { type: Function, required: true }
  },

  data: () => ({
    showMenu: false
  }),

  computed: {
    frameworkName () {
      return this.title === 'Vuency' ? 'Vue' : 'Javascript'
    },

    menuStyle () {
      return { 'display': this.showMenu ? 'block' : 'none' }
    }
  },

  methods: {
    toggleDisplay () { // display of content and menu is inversed
      this.toggleContent()
      this.showMenu = !this.showMenu
    }
  },

  components: {
    GuideMenu
  }
}
</script>

<style lang="sass" scoped>
@import "../assets/sass/util.sass"

.toolbar
  background-color: $primary-3
  // padding-left: 0
  a
    color: inherit
    text-decoration: none
.responsive-toolbar
  +flex-contain(row)
  +flex-place('children', end, center)
  float: left
  width: 100vw
  height: 4rem
  padding: 0 .75rem
  margin-bottom: 1rem
  +media('>phone')
    padding: 0 2rem
  +media('>desktop')
    +flex-contain(column, nowrap)
    +flex-place('children', start, center)
    position: fixed
    top: 0
    height: 100vh
    width: 18rem
    max-width: 100%
    // margin-right: 5rem

.toolbar-masthead
  text-align: center
  +media('<=desktop')
    +flex-place('self', start, center)
  +media('>desktop')
    margin-top: .25rem
    margin-bottom: 2.25rem
.site-title
  font-size: 2rem
  font-weight: 600
  +media('>desktop')
    font-size: 3.25rem
.site-slogan
  display: none
  +media('>desktop')
    margin-top: -.25rem !important
    display: block
    +position(relative)
    margin: 0 auto
    font-size: 92%
    font-weight: 400
    text-align: left
    span
      display: block
      +position(absolute, null, 0, null, null)

.toolbar-menu
  position: relative
  +media('>desktop')
    height: 72%
    width: 118%
    margin-left: 1.5rem
.mobile-menu-button
  display: block
  margin: 1rem 1rem
  padding: .3rem .5rem
  background-color: $primary-1
  border: $primary-1 1px solid
  color: #fff
  border-radius: .4rem
  +media('>phone')
    margin: 1rem 2rem
    padding: .5rem .75rem
  +media('>desktop')
    display: none
.main-menu
  background-color: $primary-4
  padding: 1rem .5rem 1rem 1.5rem
  overflow: scroll
  height: 100%
  width: 100%
  +media('<=desktop')
    +position(fixed, 3.5rem, 0, 0, 0)
    // height: calc(100vh - 4rem)
    // width: 100vw
  +media('>desktop')
    // override mobile data
    display: block !important
    // TODO
    // theme
    border-top: $primary-1 2px solid
    border-left: $primary-1 2px solid

.github-link
  +media('>desktop')
    width: 200%
    margin-left: -40%
  .icon-github
    font-size: 2rem
    color: $primary-1
  .plugin-version
    display: none
  +media('>desktop')
    background-color: $primary-1
    padding: .5rem 3rem
    +flex-place('children', center, center)
    .icon-github
      +flex-span(25%)
      font-size: 2.25rem
      color: #fff
</style>
