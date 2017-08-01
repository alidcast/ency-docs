---
title: Handling UI Interactions
order: 4
---

You'll often need to know the state of an ongoing operation so that you can update UI accordingly. For example, you might need to display a loading spinner when an operation is running, or to disable a button when its operation is already active. Ency exposes as much derived state as possible so that it's easy to handle everyday, front-end logic.

## Checking a task's state

There are two ways to check the state of a task:

1. You can check whether any operations are running via `task.isActive` (or `task.isIdle`).
2. You can check whether a single instance is running via `taskInstance.isRunning` (or `taskInstance.isFinished`).

Most of the time it'll be sufficient to check if the task is running. When you find you need more granular control, however, you'll need to check the state of each task instance individually.

### How can I pause the execution of a task?

You can use the `timeout` helper injected into the `tasks` property.

```js
import task, { timeout } from 'ency'

const myTask = task(function * exOperation() {
  yield timeout(1000)
})
```

The benefit of using this helper is that the timeout is disposable. If the operation is a generator functions and the task finishes early, the timeout is automatically cleaned up, which ensures minimal latency in UI interactions.

<p class="warning">
  If you choose to use async functions and wish to end a timeout early, you have to cancel it yourself with <code> timeout.dispose() </code>.
</p>

## UI Interactions Demo

Here's a simple example of how you can use these states to handle UI interactions. Notice how each button changes based on the task's derived state.

<div>
  @[tasks/StateInteractions]
</div>


With the following Javascript:

```js
task(function* () {
  yield timeout(1500)
}).flow('drop')
```

All you would need to check is the state of the task. For example:

```html
<button>{{ loader.isActive ? 'Loading...' : 'Run' }}</button>
```
