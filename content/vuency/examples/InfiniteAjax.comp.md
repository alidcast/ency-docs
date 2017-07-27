---
title: Infinite Ajax
order: 4
---

<div class="showcase">
  @[tasks/examples/InfiniteAjax]
</div>

#### Script

```js
export default {
  data: () => ({
    logs: [],
    instances: []
  }),
  tasks (t, { timeout }) {
    const loopingAjax = t(function * (id, color) {
      this.log(color, `Task ${id}: making AJAX request`)
      yield timeout(1000 + 2000 * Math.random()) // simulate slow AJAX
    })
    // Only allow 3 ajax calls to run at a time. Enqueue all others
    // to run when space frees up.
    .flow('enqueue', { maxRunning: 3 })
    // Report the result finished of the ajax call.
    .onFinish(({ params, isCanceled }) => {
      var id = params[0], color = params[1]
      if (!isCanceled) {
        this.log(color, `Task ${id}: Done, sleeping.`)
      } else {
        this.log(color, `Task ${id}: Sorry, I've been sent to the abyss!`)
      }
      // If all looping ajax calls weren't "nuked", keep running.
      if (!loopingAjax.isAborted) {
        this.instances[id] = loopingAjax.run(id, color)
      }
    })

    return {
      infiniteAjax: t(function * () {
        const { instances } = this
        instances.push(loopingAjax.run(1, '#0000FF'))
        instances.push(loopingAjax.run(2, '#8A2BE2'))
        instances.push(loopingAjax.run(3, '#DC143C'))
        instances.push(loopingAjax.run(4, '#20B2AA'))
        instances.push(loopingAjax.run(5, '#FF1493'))
        instances.push(loopingAjax.run(6, '#DAA520'))
        instances.push(loopingAjax.run(7, '#4FC40A'))
      })
      // Only one infinite ajax can run at a time, drop all other calls.
      .flow('drop')
      // Simulate infinitely active task
      .nthCall(1, { keepActive: true })
      // If the instance is destroyed, cancel all ajax calls and clean up.
      .onDispose(() => {
        loopingAjax.abort()
        this.instances = []
      })
    }
  },
  created () {
    this.infiniteAjax.run()
  },
  methods: {
    log (color, message) {
      const logs = this.logs || []
      logs.push({ color, message })
      this.logs = logs.slice(-7)
    }
  }
}
```


### Template

```html
<div class="infinite-ajax">
  <ul class="ajax-calls">
    <li v-for="log in logs"
        :style="{ color: log.color }">
      {{ log.message }}
    </li>
  </ul>

  <div class="ajax-controls" v-if="logs">
    <button v-if="infiniteAjax.isActive" @click="infiniteAjax.abort()">
      Nuke All
    </button>
    <button v-else @click="infiniteAjax.run()">
      Start Again
    </button>

    <ul v-if="instances">
      <li v-for="(instance, index) in instances" v-if="instance.isRunning">
        <button @click="instance.cancel()">
            Cancel Task: {{ index }}
        </button>
      </li>
    </ul>
  </div>
</div>
```
