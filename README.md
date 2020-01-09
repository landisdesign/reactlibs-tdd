# reactlibs-tdd

The previous project, [`reactlibs-ts`](https://github.com/landisdesign/reactlibs-ts),
helped me understand more about TypeScript and class-based components, but I
felt the need to hurry and focus specifically on those aspects without
considering methodologies. My previous work experience didn't stress TDD, so I
felt drawn to focus time and efforts on drilling this into my way of thinking.

## Improvements from `reactlibs-ts`

After working on this code base for a while I'm looking at improving the clarity
of the code, tightening the individual functions and considering their placement
in individual modules. I'm taking advantage of function hoisting to put the
top-level API at the top of the file and the helper methods below it, rather
than setting up the code for the grand finale. I find this gives a better lay of
the land up front and sets the stage better for why the helper functions exist,
rather than throwing blocks of code in like recipe ingredients.

### State simplification

As I completed the previous project, I saw how complicated state got as I
attempted to create concrete clases from the state interfaces. This time I
statyed away from this, making the modifications to the state literal as needed
in the reducers themselves.

For `config` I also simplified `fetchConfig`, which was one of my first attempts
at working with `async`/`await`. This time I converted all of my Promise
references (except `Promise.all`) and moved the internal functions out of the
thunk. I also moved the delay functionality into the array of asynchronous
functions, so that I didn't have to do an additional async step within the
`Promise.all` argument.

---

I will update this README as I continue.
