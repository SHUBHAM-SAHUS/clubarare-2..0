import { useCallback, useReducer } from 'react'

/**
 * @description This counting state manager toggles between `true` and `false`,
 * but it can be controlled from multiple places and only turns off when every switch is turned off.
 * It counts the number of switches turned on.
 *
 * @example // 1. Initialize the state
 *
 * const [state, counter, add, remove, adjust, turnOff] = useMultiwaySwitch()  // initial state set to Off - `0`
 * const [state, , add] = useMultiwaySwitch(false)      // initial state set to Off - `0`
 * const [state, , , remove] = useMultiwaySwitch(2)     // initial state set to On  - `2`
 *
 * @example // 2. Use the actions
 *
 * const [state, counter, add, remove, adjust, turnOff] = useMultiwaySwitch()  // initial state set to Off - `0`
 *
 * add()    // alias for adjust(true)
 * remove() // alias for adjust(false)
 *
 * adjust(true)  // `+1`
 * adjust(false) // `-1`
 *
 * add()    // counter: 1, state: true  // turns on
 * add()    // counter: 2, state: true
 * remove() // counter: 1, state: true  // still on
 * remove() // counter: 0, state: false // turns off
 *
 * adjust(2) // counter: 2, state: true
 * adjust(0) // counter: 0, state: false
 *
 * turnOff() // counter: 0, state: false
 *
 */

export const useMultiwaySwitch = (
  initialState: number | boolean = 0
): [
  state: boolean,
  counter: number,
  /** Adds 1 to the counter. */
  add: () => void,
  /** Subtracts 1 from the counter. */
  remove: () => void,
  adjust: {
    /**
     * Adjusts the counter by one. Same as `add()` or `remove()`.
     * @example
     * adjust(true)  // `+1`
     * adjust(false) // `-1`
     */
    (addOrRemove: boolean): void
    /**
     * Sets the value of the counter.
     * @example
     * adjust(2) // counter: 2, state: true
     * adjust(0) // counter: 0, state: false
     */
    (turnTo: number): void
  },
  /** Sets the value of the counter to 0. Alias to `adjust(0)` */
  turnOff: () => void
] => {
  const [counter, change]: [number, (turn: number | boolean) => void] = useReducer(
    (state: number, turn: number | boolean) => Math.max(typeof turn === 'boolean' ? state + (turn ? 1 : -1) : turn, 0),
    Number(initialState)
  )
  const add = useCallback(() => change(true), [])
  const remove = useCallback(() => change(false), [])
  const adjust = useCallback((to: number | boolean) => change(to), [])
  const turnOff = useCallback(() => change(0), [])
  return [counter > 0, counter, add, remove, adjust, turnOff]
}
