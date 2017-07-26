---
title: Getting Started
order: 2
---

At the center of every Ency application is the `Task` primitive, which represents an asynchronous operation that is both transparent–you always have access to its state–and controllable-you control if, when, and how repeat requests are run.

Think of a `task` as a more powerful alternative to Vue's built in `method`. Sometimes all you need is for a function to handle simple logic; in that case, use a method. But what if you need to check the state of the function as you wait for a promise to resolve? Or what if you need to cancel an operation mid-way through, or make it so that repeat requests can't fire until the previous ongoing instance finishes? In those cases and others, use a `task` and let Ency do the heavy lifting for you.

## Installation

First and foremost, install the npm package:

`npm install ency --save`


## Working with Tasks

There are two aspects to working with tasks:

1. Creating a task object and using its properties.
2. Creating a task instance and using its properties.

### Creating a Task Object

To create a task, call the task factory function with your desired operation.

The task's operation can be either a [generator function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function) or [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function). The main difference between the two options is that generator functions can yield control over their execution and so, they can be canceled at any point. For this reason, we recommend you use generator functions, as we do in our examples, so that you can take advantage of the full power of Ency.

```js
import task from 'ency'

const myTask = task(function * exOperation() {...})

```

This returns a task object that you can use to run the operation or check its state, along with other useful task properties.

For example:

```js
let task1 = myTask.run()
myTask.isActive // true
task1.cancel()
myTask.isActive // false
```

For a complete list of task states and actions, check out the [task property](/guide/task-property) API.

### Creating a task instance

Every execution of `task.run()` creates a single task instance, which represents one instance of the task's core operation.

The main difference between the task property and a task instance properties is that while the task property has control over all operation instances, the task instance only has control over its own ongoing operation.

```
let instance1  = myTask.run(),
    instance2  = myTask.run(),
    instance3  = myTask.run()

task.isActive        // true

// instance method - cancels a single instance of the operation
instance2.cancel()
instance1.isRunning  // true
instance2.isRunning  // false

task.isActive        // true

// task method - cancels all ongoing instances of the operation
task.abort()
instance2.isRunning  // false
instance3.isRunning  // false

task.isActive        // false
```

For a complete list of a task instance properties, check out the [task instance](/guide/task-instance) API.
