---
title: What's is Ency?
---

Ency helps you manage complex, event-driven operations with minimal code.

By adding extra layer between an operation and the execution of that operation, Ency can abstract away common, boilerplate logic that you would otherwise have to handle yourself.

The two main benefits are:

* **Implicit state**: Operations have their state baked in, so that you don't have to manually set and update flags (i.e. `isRunning`) yourself, to handle common UI interactions.

* **Flow control**: The scheduling and cancellation of operation instances is baked in, so you can easily manage the flow of repeat requests, as well as manually cancel an operation at any moment.

Additional benefits:

* **Callback subscriptions**: Subscribe to callbacks that are fired based on the stage or result of the operation, e.g. `beforeStart` or `onCancel`. This semantically separates the handling of corner cases from the core logic of the operation, which makes your code easier to reason about.

* **Bind data**: Bind specific parameters or options to an instance of the operation. For example, by doing `nth(1, { keepRunning: true })`, you can simulate the state of an infinite loop without overpowering the main thread with `while` loops to keep a function active.

* **Async helpers**: Common async utilities, such as a `timeout` helper, that are automatically cleaned up when the operation is over, which ensures that UI interactions flow with minimal latency.

Best of all, Ency's API strikes a nice balance between declarative and imperative styles of programming, which makes complex logic simple and fun to write!

## Moving forward with Ency

Essential:

* [Install Ency](/installation)
* [Learn basic usage](/getting-started)

Advanced:

* [Learn how to manage repeat requests](/task-flow)
* [Learn how to cancel ongoing operations](/task-cancelation)
* [Learn how to handle common UI interactions](/task-state)

## Not convinced? - See Ency in action

If you're still not convinced, check out the demos and code from the examples linked below and see the benefits yourself.

Beginner examples:

* [Coin Flip](/coin-flip)
* [Countdown Timer](/countdown-timer)

Advanced examples:

* [Infinite Ajax](/infinite-ajax)
* [Question Genie](/question-genie)
