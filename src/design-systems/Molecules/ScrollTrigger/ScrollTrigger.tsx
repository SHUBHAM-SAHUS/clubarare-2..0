import { useEffect, useRef } from 'react'

import { Spinner } from 'design-systems/Atoms/Spinner'
import { Typography } from 'design-systems/Atoms/Typography'
import { debounce, PAGE_SCROLL_TRIGGER_DELAY } from 'utils'
import { useShallowState } from 'hooks/useShallowState'

export interface ScrollTriggerProps {
  text?: string
  isLoading?: boolean
  onTrigger?: () => void
  className?: string
}

export const ScrollTrigger: React.FC<ScrollTriggerProps> = ({
  text = '',
  isLoading,
  className = '',
  onTrigger: onTrigger_,
}) => {
  const element = useRef<HTMLDivElement>(null)

  const [scroll, setScroll, , refState] = useShallowState({
    prevRatio: 0,
    isScrollingUpDirection: false,
    isIntersecting: false,
  })

  useEffect(() => {
    const targetElement = element.current
    if (!targetElement || !onTrigger_) return
    if (isLoading) return

    const onTrigger = debounce(onTrigger_, PAGE_SCROLL_TRIGGER_DELAY)

    function handleIntersection([{ intersectionRatio, isIntersecting }]: IntersectionObserverEntry[]) {
      const prevRatio = refState.current.prevRatio
      const isScrollingUpDirection = intersectionRatio < prevRatio

      setScroll({
        prevRatio: intersectionRatio,
        isIntersecting,
        isScrollingUpDirection,
      })

      if (intersectionRatio === 1) onTrigger()
      if (prevRatio === 1 && isScrollingUpDirection) onTrigger.cancel()
    }

    const observer = new IntersectionObserver(handleIntersection, { threshold: [0, 0.1, 0.9, 1] })
    observer.observe(targetElement)

    return () => {
      observer.unobserve(targetElement!)
    }
  }, [refState, setScroll, isLoading, onTrigger_])

  return (
    <div
      className={`invert-fg mb-0 mt-[-40px] flex scroll-mb-0 justify-center ${className}`}
      id="ScrollTrigger"
      ref={element}
    >
      <Typography className="large opacity-60">{isLoading ? <Spinner /> : text}</Typography>
    </div>
  )
}
