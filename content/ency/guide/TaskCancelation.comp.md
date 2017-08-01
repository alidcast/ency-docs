---
title: Task Cancelation
order: 5
---

There are two main ways that tasks are canceled: implicitly (based on how the task is configured, or because the task's host object was destroyed) or explicitly (by calling one of the cancel methods on the task property or task instance).

In most cases, you'll want to configure your tasks (via the task's [flow modifier](/guide/task-flow)) such that are automatically and implicitly canceled at the right time. But there are still cases where you'll need to manually cancel the task yourself.

## Self Cancelation

There are three ways to self cancel a task:

1. Call `task.abort()` to cancel all task instances.
2. Call `task[lastCalled/lastStarted].cancel()` to cancel the most recent instance.
3. Get each individual instance and call `taskInstance.cancel()` on it.

Sometimes you'll also need to differentiate between instances that you canceled versus those that were canceled due to flow control policies. For this, you can check the `selfCanceled` property of each instance, which will only be true if the instance was canceled manually.

For example:

```js
import task from 'ency'

const myTask = task.flow('drop', { maxRunning: 1 })

const instance1 = myTask.run()
const instance2 = myTask.run()

instance2.isCanceled   // true
instance2.selfCanceled // false, canceled because of 'drop' policy

instance1.cancel()
instance1.isCanceled   // true
instance1.selfCanceled // true, manually canceled
```

## Task Cancelation Demo

Here's a demo that shows that differences between all these approaches and how they all work together.

<div class="showcase">
  @[tasks/CancelationTracker]
</div>

As you can see, you can an individual task instance, the last run task instance, or all tasks at once, each with minimal latency.
