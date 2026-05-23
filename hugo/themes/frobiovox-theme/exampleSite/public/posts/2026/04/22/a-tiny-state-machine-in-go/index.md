# A tiny state machine in Go

| key | value |
| --- | --- |
| url | https://example.org/posts/2026/04/22/a-tiny-state-machine-in-go/ |
| date | 2026-04-22 |
| category | Code |
| tags | go, patterns, tutorial |
| description | When you don't need a library: a 40-line state machine using a map of transitions. |


Every few months I reach for a state-machine library and then talk myself out of it. The reason is always the same: the thing I'm modeling has six states and twelve transitions, and a map literal is shorter than the import statement.

Here's what I keep coming back to.

## The shape

A state machine is, at its smallest, a function from `(state, event) → state`. Everything else is sugar. In Go that becomes:

```go
package fsm

type State string
type Event string

type Transition struct {
    From  State
    Event Event
}

type Machine struct {
    state       State
    transitions map[Transition]State
}

func New(initial State, transitions map[Transition]State) *Machine {
    return &Machine{state: initial, transitions: transitions}
}

func (m *Machine) State() State { return m.state }

func (m *Machine) Send(e Event) bool {
    next, ok := m.transitions[Transition{From: m.state, Event: e}]
    if !ok {
        return false
    }
    m.state = next
    return true
}
```

That's it. Forty lines if you count the package declaration.

## Using it

Define the transitions as a map literal. Read it like a table:

```go
const (
    Idle      fsm.State = "idle"
    Loading   fsm.State = "loading"
    Loaded    fsm.State = "loaded"
    Errored   fsm.State = "errored"

    Fetch     fsm.Event = "fetch"
    Resolve   fsm.Event = "resolve"
    Reject    fsm.Event = "reject"
    Retry     fsm.Event = "retry"
)

m := fsm.New(Idle, map[fsm.Transition]fsm.State{
    {Idle, Fetch}:      Loading,
    {Loading, Resolve}: Loaded,
    {Loading, Reject}:  Errored,
    {Errored, Retry}:   Loading,
})

m.Send(fsm.Fetch)    // → loading
m.Send(fsm.Resolve)  // → loaded
```

The table reads like a spec. When a new transition is added, you add a row. When one is removed, you delete a row. No graph traversal, no DSL, no codegen.

## What you give up

You don't get:

- **Entry / exit actions** — call a function automatically when entering a state
- **Guards** — conditional transitions
- **Hierarchical states** — sub-states inside a parent
- **History / pushdown** — return to a previous state

If you need any of these, reach for a real library. Stateless machines like this one are a tool for the easy 80%, not the hard 20%.

## When to actually use it

Anywhere you've written a chain of `if state == "X" && event == "Y"`. UI workflows. Connection lifecycles. Parser modes. Anything where the bug you're most worried about is "we got into a weird state because the wrong event landed at the wrong moment" — making the table explicit makes that bug visible.

The library is in your head. The implementation is forty lines.

