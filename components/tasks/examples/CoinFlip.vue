<template>
  <div class="coin-flip">
    <p>
      Heads or Tails? {{ answer }}
    </p>
    <button @click="flipCoin.run()">
      {{ flipCoin.isActive ? 'May the odds be with you...' : 'Flip coin'}}
    </button>
  </div>
</template>

<script>
export default {
  data: () => ({
    answer: ''
  }),

  tasks (t, { timeout }) {
    return {
      flipCoin: t(function * () {
        this.answer = yield timeout(1000)
          .then(() => Math.random() < 0.5 ? 'Heads' : 'Tails')
      })
      .flow('drop')
      .beforeStart(() => {
        this.answer = ''
      })
    }
  }
}
</script>
