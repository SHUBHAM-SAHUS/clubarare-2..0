/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'

export const useDateHandler = () => {
  const getUtcStartTime = useCallback((startDate: string) => {
    //getUtcStartTime
    const startingDate = new Date(startDate)
    const startingUTCDate = Date.UTC(
      startingDate.getUTCFullYear(),
      startingDate.getUTCMonth(),
      startingDate.getUTCDate(),
      startingDate.getUTCHours(),
      startingDate.getUTCMinutes()
    )
    return Math.ceil(startingUTCDate.valueOf() / 1000)
  }, [])

  const getUtcEndTime = useCallback((endDate: string) => {
    // getUtcEndTime
    const endingDate = new Date(endDate)
    const endingUTCDate = Date.UTC(
      endingDate.getUTCFullYear(),
      endingDate.getUTCMonth(),
      endingDate.getUTCDate(),
      endingDate.getUTCHours(),
      endingDate.getUTCMinutes()
    )
    return Math.ceil(endingUTCDate.valueOf() / 1000)
  }, [])

  // End time handler

  return {
    getUtcStartTime,
    getUtcEndTime,
  }
}
