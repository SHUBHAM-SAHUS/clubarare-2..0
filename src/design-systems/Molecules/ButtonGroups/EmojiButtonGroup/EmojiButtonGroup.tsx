import { useEffect, useState } from 'react'

import { iconClassName, emojis } from './utils'
import type { EmojiCountType, EmojiReactionType, EmojiButtonGroupProps } from './interface'

import { useGetReactions } from 'hooks/api/useGetReactions'
import { useReactionAssets } from 'hooks/api/useReactionAssets'
import { useToggle } from 'hooks/useToggle'
import { CloseIcon } from 'design-systems/Atoms/Icons'
import { IconButton } from 'design-systems/Atoms/IconButton'
import { Typography } from 'design-systems/Atoms/Typography'

export const EmojiButtonGroup = ({ userProfileId, initialCount, walletAddress, isSigned }: EmojiButtonGroupProps) => {
  const [count, setCount] = useState<EmojiCountType>(initialCount)
  const [userReactions, setUserReactions] = useState<EmojiReactionType>({
    heart: false,
    thumb: false,
    clap: false,
    fire: false,
    smile: false,
  })
  const [showButton, setShowButton] = useToggle(true)
  const { userReaction } = useReactionAssets()
  const { reactionData } = useGetReactions(walletAddress)

  useEffect(() => {
    if (reactionData) {
      setCount(reactionData.reaction)
      setUserReactions(reactionData.userReaction)
    }
  }, [reactionData])

  const handleClickEmoji = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isSigned) return
    const key = String(event.currentTarget.id)
    const newCount =
      userReactions[key as keyof EmojiCountType] === true
        ? count[key as keyof EmojiCountType] - 1
        : count[key as keyof EmojiCountType] + 1
    const updatedCount = { ...count, [key]: newCount }
    setCount(updatedCount)
    const updatedReactions = { ...userReactions, [key]: !userReactions[key as keyof EmojiCountType] }
    setUserReactions(updatedReactions)
    const req = {
      to_user: userProfileId,
      reaction: updatedReactions,
    }
    await userReaction(req)
  }

  return (
    <>
      {showButton && (
        <div className="h-full w-full items-center justify-center gap-2.5 rounded-t-sm bg-neutral-800 shadow-[0_12px_12px_0_rgba(225,225,225,0.4)] dark:bg-neutral-200 md:h-[52px] md:w-[253px] md:rounded-full">
          <div className="flex items-center justify-between p-3 md:hidden">
            <Typography className="text-neutral-200 dark:text-neutral-600" size="caption">
              REACT
            </Typography>
            <div onClick={setShowButton}>
              <CloseIcon className="cursor-pointer stroke-neutral-500" stroke="#B4B4B4" />
            </div>
          </div>
          <ul className="rounded-CloseIcon flex items-center justify-between gap-2.5 bg-neutral-800 p-3 dark:bg-neutral-200 md:rounded-full">
            {emojis.map(({ Icon, id, fill, stroke }) => (
              <IconButton className="flex items-center bg-transparent" id={id} key={id} onClick={handleClickEmoji}>
                <Icon
                  className={`${stroke} ${iconClassName} ${
                    userReactions[id as keyof EmojiCountType] ? 'bg-neutral-700 dark:bg-neutral-300' : ''
                  } hover:bg-neutral-700 focus:bg-neutral-600 dark:hover:bg-neutral-300 dark:focus:bg-neutral-400`}
                  fill={fill}
                />
                <Typography className="text-neutral-200 dark:text-neutral-600" size="small">
                  {count[id as keyof EmojiCountType]}
                </Typography>
              </IconButton>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
