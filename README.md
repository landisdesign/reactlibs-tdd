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
stayed away from this, making the modifications to the state literal as needed
in the reducers themselves.

#### DRY'ing Redux

I tend to be a fanatic for making my code DRY. The balance between reuse and
complexity can be a challenge to maintain. I find that DRY only works in small,
bite-sized units. Creating helper functions instead of frameworks. As I was
writing this code, Dan Abramov
[wrote a blog](https://overreacted.io/goodbye-clean-code/) discussing the
challenges with DRY'ing, and it felt right.

So, when I approach DRY'ing, I look for ways to keep the pieces small. Some
things, such as the error handling
[desribed below](#streamlining-and-adding-error-handling-to-fetchConfig), have
such large blocks of repetition it begs for a large, thought-out method of code
management. The balance there lies between making the code flexible enough to
manage a variety of cases, and making it too complex to understand without seven
cups of coffee and an isolation tank.

But most circumstances end up with small, 5-or-10-line functions that _can_ be
used, but don't have to be. The route I negotiate to avoid Dan's dilemma is
aiming to make functions that plug into the existing code. The general cases can
take advantage of the refactor, but don't have to.

In a team environment, of course, none of this makes sense without checking who
might be impacted by the change. Prior contributors and testers need to vet my
thoughts before I start changing their code and adding to the testing
requirements willy-nilly.

#### Strategies instead of `switch`

One of my favorite GoF patterns is the
[Strategy pattern](https://en.wikipedia.org/wiki/Strategy_pattern). When I look
at typical reducer functionality, it involves choosing an algorithm
dependent upon the incoming action type, and using that algorithm to create a
new instance of the state based upon the action's payload. Frequently this
appears as a collection of statements in `switch` cases associated with the
action type, but this is exactly what the Strategy pattern is designed for.

In my previous iterations of this application, I chose to follow the standards
presented in most tutorials. This time, I chose to build my reducer using an
action type-keyed associative array that returned algorithms instead. I feel
this lets the reader of the code skip through the reducer and go to the specific
function associated with the action type. It reduces the logic complexity of the
reducer code, consolidating all of the different possible execution routes into
a single top-to-bottom flow.

It is different than what others may expect, based upon their experience and
learning, so I hesitate to introduce it to mature code bases without getting
buy-in from the others impacted by this change.

#### Streamlining and adding error handling to `fetchConfig`

`fetchConfig` was one of my first attempts at working with `async`/`await`, and
I didn't have the time to work out all of the nuances differentiating this
syntax from traditional Promise usage. For this iteration I took the time to
translate all of my Promise references (except `Promise.all`) and I appreciate
how much clearer it is.

The next thing I looked at was adding error handling to the JSON retrieval. I'd
purposely avoided handling this in prior iterations, as I was working on MVP to
illustrate my ability to work with React in and out of TypeScript. As I began
speaking with security-oriented companies, I realized I hadn't given a
demonstration of my ability to recognize and manage boundary conditions.

I can rely upon `JSON.parse` to validate that the incoming JSON is well-formed,
but it returns objects of type `any`, so I cannot guarantee that the provided
object is actually of the type I require. To address this I had to build a
structure validation system. (I can imagine that such things exist on npm, but
this was more fun.)

As I added the error handling to each of the fetches, it occurred to me that I
had enough consistency between fetches to DRY the code, resulting in `fetchData`.

#### Simplification of entries reducer

Initially I'd intended to present the previous entries from each story, so that
as the user switched from story to story, they could see what was previously
entered. A while back I chose to clear the entries whenever the user chose a
different story, but never took the time to simplify the entries. (Real life
example of technical debt!) By replacing this  so that a single array is updated
as the story is chosen, I should be able to simplify how the words are populated
too, as the story index is no longer necessary at the entry level.

---

I will update this README as I continue.
