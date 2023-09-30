import React, { useCallback, useMemo } from 'react'

import { Button } from 'design-systems/Atoms/Button'
import { classNames } from 'utils'
import { useToggle } from 'hooks/useToggle'

export enum MarketplaceActions {
  BID = 'place bid',
  OFFER = 'offer',
  BUY = 'buy',
  LIST = 'put on sale',
  UNLIST = 'withdraw',
}

export interface MarketplaceButtonProps {
  className?: string
  isListed: boolean
  isOwner: boolean
  onClick: (action: MarketplaceActions) => Promise<void> | void
}

export const MarketplaceButton: React.FC<MarketplaceButtonProps> = ({
  className,
  isListed = false,
  isOwner = false,
  onClick,
}) => {
  const [locked, , , lock, unlock] = useToggle(false)

  const action = useMemo<MarketplaceActions | undefined>(() => {
    if (isOwner) {
      if (isListed) {
        return MarketplaceActions.UNLIST
      }
      return MarketplaceActions.LIST
    } else {
      if (isListed) {
        return MarketplaceActions.BID
      }
      return undefined
    }
  }, [isListed, isOwner])

  const handleClick = useCallback(async () => {
    if (!action) return

    lock()
    try {
      await onClick(action)
    } catch (error) {
      console.error(`Marketplace action error - ${action}`, error)
    }
    unlock()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, onClick])

  if (!action) return <></>

  return (
    <Button
      className={classNames(className, 'uppercase')}
      color="neon"
      disabled={locked}
      loading={locked}
      onClick={handleClick}
    >
      {action}
    </Button>
  )
}
