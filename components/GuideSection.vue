<template lang="pug">
  div
    component.content(is="introduction" id="introduction")
</template>

<script>
import docs from '~articles/index'

export default {
  props: {
    lesson: { type: String, required: true }
  },

  components: docs
}
</script>

<style lang="sass">
.content
  float: left
  max-width: 40rem
</style>
