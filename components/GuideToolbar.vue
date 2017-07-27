<template lang="pug">
  div.toolbar.responsive-toolbar(:style="toolbarStyleVars")
    div.toolbar-masthead
      a.site-title(href="/") {{ title }}
      div.framework-options
        button.options-button(@click="showOptions = !showOptions") &#9660;
        ul.options-list(v-show="showOptions")
          li(v-for="option in frameworks")
            nuxt-link(:to="option.link") {{ option.name }}
      p.site-slogan Concurrency management
        | <span :style="forStyle">for {{ frameworkName }}.</span>

    div.toolbar-menu
      button.mobile-menu-button(@click="toggleDisplay") Menu
      div.menu-container(class="main-menu" :style="menuStyle" :menu="menu")
        template(v-for="section in Object.keys(categorizedMenu)")
          ul(v-if="categorizedMenu[section].length > 0")
            h5.group-heading {{ section }}
            li(v-for="lesson in categorizedMenu[section]")
              nuxt-link.section-heading(:to="lesson.path") {{ lesson.title }}

    div.toolbar-links
      a.github-link(href="https://github.com/alidcastano/vuency")
        span.icon-github
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    menu: { type: Array, required: true },
    toggleContent: { type: Function, required: true }
  },

  data: () => ({
    showOptions: false,
    showMenu: false,
    frameworks: [
      { name: 'Ency', link: '/ency' },
      { name: 'Vuency', link: '/vuency' }
    ]
  }),

  computed: {
    categorizedMenu () {
      return organizeSections(this.menu)
    },

    isDefault () {
      return this.title === 'Ency.js'
    },

    frameworkName () {
      return this.isDefault ? 'Javascript' : 'Vue'
    },

    toolbarStyleVars () {
      return this.isDefault
        ? { '--p1-color': ' #2c8ba0', '--p2-color': '#d7eff4', '--p3-color': '#ebf7fa' }
        : { '--p1-color': ' #2d8655', '--p2-color': '#c6ecd7', '--p3-color': '#ecf9f2' }
    },

    forStyle () {
      const abs = { 'position': 'absolute' }
      this.isDefault ? abs.left = '5rem' : abs.left = '7rem'
      return abs
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

<style lang="sass" scoped>
@import "../assets/sass/util.sass"

.toolbar
  background-color: var(--p2-color)
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

.site-title,
.framework-options
  display: inline-block
  +media('>desktop')
    &:hover .options-list
      display: block !important
.options-button
  position: relative
  top: 1rem
  left: .5rem
  height: 50%
  padding: .25rem
  border: none
  background-color: var(--p3-color)
  color: var(--p1-color)
  border-radius: 4px
  cursor: pointer
  &:focus
    outline: 0
  +media('>desktop')
    top: -.5rem
    padding: .25rem .4rem
.options-list
  background-color: var(--p3-color)
  border: 1px solid var(--p1-color)
  position: absolute
  top: 1.5rem
  left: 10rem
  padding: .25rem 1.25rem
  border-radius: 4px
  list-style-type: none
  +media('>desktop')
    top: 2.5rem
    left: 15.85rem
    padding: .5rem 2rem
  li:nth-child(n+2)
    margin-top: .25rem
    padding-top: .25rem
    border-top: 1px solid var(--p3-color)
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
  background-color: var(--p1-color)
  border: var(--p1-color) 1px solid
  color: #fff
  border-radius: .4rem
  +media('>phone')
    margin: 1rem 2rem
    padding: .5rem .75rem
  +media('>desktop')
    display: none
.main-menu
  background-color: var(--p3-color)
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
    // theme
    border-top: var(--p1-color) 2px solid
    border-left: var(--p1-color) 2px solid


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
  color: var(--p1-color)
.section-heading
  display: block
  margin-bottom: .5rem

.github-link
  +media('>desktop')
    width: 200%
    margin-left: -40%
  .icon-github
    font-size: 2rem
    color: var(--p1-color)
  .plugin-version
    display: none
  +media('>desktop')
    background-color: var(--p1-color)
    padding: .5rem 3rem
    +flex-place('children', center, center)
    .icon-github
      +flex-span(25%)
      font-size: 2.25rem
      color: #fff
</style>
