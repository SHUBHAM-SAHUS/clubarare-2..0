import { EffectCallback, useEffect } from 'react'

/**
 * Runs the specified effect only once when the component mounts.
 * Similar to componentDidMount in class components.
 *
 * @param effect - The effect callback function to run on mount.
 */
export function useMountEffect(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, [])
}
