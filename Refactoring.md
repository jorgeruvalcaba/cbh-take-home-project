# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in
[`dpk.js`](dpk.js) to make it easier to read and understand without changing its
functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your
   refactor doesn't break it. We typically use `jest`, but if you have another
   library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are
   many valid ways to define those words - use your own personal definitions,
   but be prepared to defend them. Note that we do like to use the latest JS
   language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you
   did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the
depth of your refactor, and the level of insight into your thought process
provided by the written explanation.

## Your Explanation Here

In my solution, I focused on making the code more readable by simplifying the
logic and reducing the amount of nesting. I also made the code more concise by
avoiding unnecessary assignments and using the ternary operator or the nullish
coalescing operator to simplify the return statements. I used the latest
language features like optional chaining to make the code more concise and
easier to read.

I made the following changes to the original code:

- Removed unnecessary let declaration of candidate variable and replacing it
  with const.
- Used early return to avoid nesting multiple if statements.
- Simplified code by using the nullish coalescing operator to handle the hash
  condition.
