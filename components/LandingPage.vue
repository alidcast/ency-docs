<template lang="pug">
  div.landing-page

    div.landing-header
      div.header-masthead
        a(href="/")
          img.site-logo(src="~assets/img/logo.png")
      div.header-links
        a.top-link(href="/introduction") Guide
        div.dropdown-menu
          button(@click="showOptions = !showOptions")
            p.top-link Libraries <span class="arrow"> &#9662; </span>
          ul.menu-options(:style="optionsClass")
            li
              a(href="") Plain JS
            li
              a(href="") Vue.js

    div.landing-lead
      div.pitch-container
        h1.pitch-slogan Enhanced concurrency primitives for Javascript.
        h3.pitch-description
          | Gain complete control and transparency over the execution of concurrent
          |  and asyncronous operations, with almost no code.
      div.actions-container
        a.action-link(href="/introduction")
          p Learn More
        a.action-link(href="/getting-started")
          p Get Started

    div.landing-body
      div.benefits-container
        ul
          li.benefit-section
            span.icon-load
            div
              h4 Handle common UI operations
              p
                | An operation's state is baked in, so you can handle common
                | UI operations, such as displaying loading spinners or styling
                | inactive buttons.
          li.benefit-section
            span.icon-control
            div
              h4 Manage the flow of repeat requests
              p
                | Operation scheduling and cancellation are baked in, so you can control
                | if, when, and how repeat calls to the same operation are run.
          li.benefit-section
            span.icon-work
            div
              h4 Minimize boilerplate
              p
                | Save time and effort handling corner cases and cleaning up after
                | complex operations.
          li.benefit-section
            span.icon-code
            div
              h4 Write declarative code
              p
                | Deliver code that is easier to reason about and
                | maintain, and feels "at home" for JS developers.
</template>
<script>
export default {
  data: () => ({
    showOptions: false
  }),
  computed: {
    optionsClass () {
      return { display: this.showOptions ? 'block' : 'none' }
    }
  }
}
</script>
<style lang="sass">
@import "../assets/sass/util.sass"

.landing-page
  +media('>desktop')
    height: 100vh
  ul
    list-style-type: none
    padding-left: 0
  a
    cursor: pointer
    color: #515151
    &:hover
      text-decoration: none
  button
    outline: none

.landing-header
  +flex-contain(row, wrap)
  +flex-place('children', end, center)
  padding: .5rem
  +media('>tablet')
    padding: 1rem 3rem
.header-masthead
  +flex-place('self', start, center)
  .site-logo
    height: 40px
    width: 125px
    margin: .25rem
.header-links
  +flex-contain(row, wrap)
  +flex-place('children', center, center)
  .dropdown-menu
    position: relative
    .menu-options
      display: none
      position: absolute
      top: 1.75rem
      width: 6rem
      background: #fff
      border: 1px $primary-4 solid
      border-radius: 10px
      padding: .5rem 1rem
    +media('>tablet')
      &:hover .menu-options
        display: block !important
        width: 8rem
  button
    background: #fff
    border: none
  .top-link
    font-size: 1rem
    color: $gray-1
    margin: 0 .25rem 0 0
    +media('>tablet')
      margin: 0 .5rem
  .arrow
    color: $gray-4
    margin-left: -.125rem
    font-size: 1.125rem
    font-weight: 800

.landing-lead
  margin: 1rem auto 0 auto
  max-width: 64rem
  padding: 1rem
.pitch-container
  .pitch-slogan
    color: $gray-1
    font-size: 1.5rem
    +media('>tablet')
      text-align: center
      font-size: 2.5rem
  .pitch-description
    font-size: 1.125rem
    font-weight: 400
    margin-top: 0
    +media('>tablet')
      width: 80%
      margin: 0 auto
      // padding-left: 1rem
      font-size: 1.5rem

.actions-container
  +flex-contain(row, wrap)
  +flex-place('children', center, center)
  text-align: center
  .action-link
    +flex-span(40%)
    +flex-place('children', center, center)
    margin: .5rem
    background-color: $primary-1
    border-color: $primary-1
    color: #fff
    border-radius: .4rem
    padding: .5rem 0 .025rem 0
    text-decoration: none
    +media('>tablet')
      +flex-span(30%)
      margin: 2rem
      padding: .5rem .25rem .125rem .25rem
    p
      font-size: 1.125rem
      +flex-place('self', center, center)
      +media('>tablet')
        font-size: 1.75rem

.landing-body
  background: $primary-4
  border-bottom: 1rem solid $primary-3
  padding: 1rem
  +media('>tablet')
    padding: 1rem 3rem 1.25rem 3rem
.benefits-container
  margin: 2rem auto 0 auto
  ul
    padding-left: 0
    +flex-contain(row, wrap)
    +flex-place('children', start, top)
  .benefit-section
    +flex-contain(row, wrap)
    +flex-place('children', center, start)
    padding: .25rem
    +flex-span(100%)
    +media('>tablet')
      +flex-span(50%)
    span
      font-size: 1.5rem
      padding: 0 .75rem 0 0
      +media('>tablet')
        font-size: 2rem
    h4
      margin-top: 0
    div
      +flex-span(84%)
</style>
