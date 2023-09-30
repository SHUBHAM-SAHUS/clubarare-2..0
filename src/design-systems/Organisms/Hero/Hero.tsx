import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { HeroProps } from './interface'

import { Button } from 'design-systems/Atoms/Button'
import { Typography } from 'design-systems/Atoms/Typography'
import { CardCarousel } from 'design-systems/Molecules/Carousel'
import { PAGE_ROUTES, classNames, shortWalletAddress } from 'utils'

export const Hero: React.FC<HeroProps> = ({ elements = [], details = [], onGetStarted }) => {
  const router = useRouter()
  const [user, setUser] = useState<string | undefined>()

  const handleNavigate = useCallback(
    (route: string) => () => {
      router.push(route)
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )

  const userHandler = useCallback(
    (index: number) => {
      return (
        details[index]?.userObj &&
        (details[index]?.userObj.name
          ? details[index]?.userObj.name
          : shortWalletAddress(details[index]?.userObj.walletAddress))
      )
    },
    [details]
  )

  const getActiveSlide = useCallback(
    (_: number, state: any) => {
      let index = state?.currentSlide - 2
      if (index == 5) {
        index = 0
      }
      setUser(userHandler(index < 0 ? index + 5 : index))
    },
    [userHandler]
  )

  useEffect(() => {
    setUser(userHandler(0))
  }, [userHandler])

  return (
    <div className="bg-neutral-100 py-6 md:py-10 md:pl-10 md:pr-14 lg:px-24">
      <div className="container mx-auto">
        <div className="container mx-auto">
          <div className="flex w-full select-none flex-col items-center justify-between md:flex-row">
            <div className="w-full px-6 md:w-2/4 md:space-y-4 md:px-0">
              <Typography className="font-RobotoCondensed text-paragraph font-bold uppercase leading-h4 tracking-h4 text-neutral-700 sm:text-h4 md:font-Roboto md:text-h4 md:font-black md:leading-h2 md:tracking-h2 lg:text-h3">
                UNIQUE, RARE, and <br />
                limited-edition items
              </Typography>
              <Typography className="mt-2 max-w-lg font-RobotoCondensed text-sm font-normal leading-paragraph tracking-paragraph text-neutral-700 sm:text-body md:mt-0 md:font-Roboto md:text-md md:font-bold md:tracking-body lg:text-body">
                Create, Collect, and Trade unique and limited edition NFTs that are backed by real world items
              </Typography>
              <div className="hidden md:flex">
                <Button
                  className="mr-4 !px-4 uppercase transition-all duration-200 hover:scale-110"
                  color="neon"
                  size="small"
                  variant="solid"
                  onClick={onGetStarted}
                >
                  Get Started
                </Button>
                <Button
                  className={classNames(
                    'mr-4 bg-transparent !px-4 uppercase',
                    'transition-all duration-200 hover:scale-110 hover:bg-transparent'
                  )}
                  color="neon"
                  size="small"
                  variant="outlined"
                  onClick={handleNavigate(PAGE_ROUTES.explore)}
                >
                  Explore
                </Button>
              </div>
            </div>

            <div className="w-full pr-0 md:w-2/5 md:pr-16">
              <CardCarousel
                activeSlide={getActiveSlide}
                className="hero-carousel w-full !px-0 !pb-6 !pt-8"
                cols={1}
                elements={elements}
                itemClass="px-0"
                removeArrowOnDeviceType={['mobile', 'landscape']}
              />
              <Typography className="mt-1 flex items-center justify-center text-small font-normal text-neutral-700">
                {user}
              </Typography>
              <div className="mx-6 mt-8 flex flex-col space-y-4 md:hidden md:w-full md:items-center md:justify-center">
                <Button
                  className="uppercase md:w-1/2"
                  color="neon"
                  fullWidth={true}
                  size="small"
                  variant="solid"
                  onClick={onGetStarted}
                >
                  Get Started
                </Button>
                <Button
                  className="uppercase md:w-1/2"
                  color="neon"
                  fullWidth={true}
                  size="small"
                  variant="outlined"
                  onClick={handleNavigate(PAGE_ROUTES.explore)}
                >
                  Explore
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
