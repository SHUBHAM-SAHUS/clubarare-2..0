import moment from 'moment'
import { ChangeEvent, useCallback, useState } from 'react'

import leaderBoardBanner from 'assets/images/leaderBoardBanner.png'
import { Button } from 'design-systems/Atoms/Button'
import { SearchIcon } from 'design-systems/Atoms/Icons'
import { Input } from 'design-systems/Atoms/Input'
import { Typography } from 'design-systems/Atoms/Typography'
import { RankCard } from 'design-systems/Molecules/Cards/RankCard'
import { RewardForm } from 'design-systems/Molecules/Forms/RewardForm'
import { Layout } from 'design-systems/Organisms/Layout'
import { useGlobalState } from 'hooks/store/useGlobalState'
import { CLUBRARE_SOCIAL_LINKS } from 'utils'

export function RewardPageTemplate() {
  const { authUser: activatingUser } = useGlobalState()
  const [search, setSearch] = useState<string>('')
  const [currentDate, setCurrentDate] = useState<Date>(new Date())

  const handleRewardSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }, [])

  const handleSearch = useCallback(() => {
    //TOOD: implement search functionality
  }, [search])

  const handleRewardSearchKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSearch()
      }
    },
    [handleSearch]
  )

  const handleRewardDateFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    //TODO: handle date filter change
    setCurrentDate(new Date(value))
  }

  const renderRankCard = useCallback(() => {
    return (
      <>
        {Array.from(new Array(5)).map((_, index) => (
          <div className="flex pt-1" key={index}>
            <RankCard
              boost={'4X'}
              boostTooltip="1st-25th: 4x / 26th-50th: 3x / 51st-75th: 2x / 76th-100th: 1x"
              className="mx-6"
              rank={1 + index}
              score={5781 - index}
              walletAddress={activatingUser?.walletAddress as string}
            />
          </div>
        ))}
      </>
    )
  }, [])

  return (
    <Layout>
      <div className="relative flex h-[407px] w-full justify-around bg-neutral-700 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-700">
        <div
          className="hidden h-[407px] w-[100vw] lg:block"
          style={{
            background: `url(${leaderBoardBanner.src})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            mixBlendMode: 'luminosity',
          }}
        ></div>
        <div className="container absolute top-24 flex flex-col items-center justify-center gap-4">
          <Typography className="typography-h3 md:typography-h1" size="h3" variant="regular">
            LEADERBOARD
          </Typography>
          <Typography className="mb-2 mt-2 text-center font-Roboto text-body" size="body" variant="regular">
            Thank you for joining the MPWR Reward System to boost ClubRare&apos;s vibe.
          </Typography>

          <Button
            className="mt-2"
            color="neon"
            variant="solid"
            onClick={() => window.open(String(CLUBRARE_SOCIAL_LINKS.leaderBoardReward), '_blank', 'noopener')}
          >
            READ DETAILS
          </Button>
        </div>
      </div>
      <div className="w-full bg-neutral-800 px-0 py-16  dark:bg-neutral-300 xl:mx-auto">
        <div className="mx-auto flex max-w-1184 flex-col justify-center gap-xl ">
          {activatingUser?.walletAddress && (
            <RewardForm className="mx-6" walletAddress={activatingUser?.walletAddress} />
          )}
          <div className="mx-6 pt-5">
            <Input
              icon={<SearchIcon className=" fill-neutral-500" />}
              inputClassName="border !border-neutral-700 !bg-neutral-700 p-2 dark:!border-neutral-100 dark:!bg-neutral-100"
              label="Enter wallet address to check the ranking"
              name="rewardSearch"
              value={search}
              variant="secondary"
              onChange={handleRewardSearchChange}
              onKeyDown={handleRewardSearchKeyDown}
            />
          </div>
          <div className="mx-6 flex pt-5">
            <div className="flex justify-start">
              <Input
                className="w-[154px]"
                id="rewardDateFilter"
                label=""
                name="rewardDateFilter"
                type="date"
                value={moment(currentDate).format('YYYY-MM-DD')}
                variant="fill"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleRewardDateFilterChange(e)}
              />
            </div>
            <div className="flex items-center justify-start pl-5 text-neutral-400">
              <Typography>Results: Rank 1-100</Typography>
            </div>
          </div>
          {renderRankCard()}
        </div>
      </div>
    </Layout>
  )
}
