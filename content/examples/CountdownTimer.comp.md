## Countdown Timer

<div class="showcase">
    @[tasks/examples/CountdownTimer]
</div>

```js
const COUNT_START = 10

export default {
  data: () => ({
    count: COUNT_START
  }),

  tasks: (t, { timeout }) => ({
    counter: t(function * () {
      this.count = COUNT_START
      while (this.count > 0) {
        // Pause before each count.
        yield timeout(300)
        --this.count
      }
      this.count = 'DONE'
    })
    // If called again, restart counter.
    .flow('restart')
  })
}
```

```html
<div>
  <div class="countdown-timer ">
    <p> Count: {{ this.count }}</p>
    <button @click="counter.run()"> Start Over </button>
  </div>
</div>
```
