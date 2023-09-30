import { useMemo } from 'react'
import Carousel from 'react-multi-carousel'

import { CarouselProps } from './interface'
import 'react-multi-carousel/lib/styles.css'

export const CardCarousel: React.FC<CarouselProps> = ({
  className = '',
  activeSlide = () => {},
  cols = 4,
  withArrows = true,
  withIndicators = true,
  elements = [],
  removeArrowOnDeviceType = [],
  itemClass = '',
  mobileCols,
}) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: cols,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: cols,
    },
    tablet: {
      breakpoint: { max: 1024, min: 669 },
      items: cols == 1 ? cols : 2,
    },
    landscape: {
      breakpoint: { max: 669, min: 464 },
      items: cols == 1 ? cols : 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: mobileCols ? mobileCols : 1,
    },
  }

  const classNames = ['relative py-6 px-6', className].join(' ')
  const itemClasses = ['px-2', itemClass].join(' ')

  return (
    <div className={classNames}>
      <Carousel
        afterChange={(previousSlide, state) => activeSlide(previousSlide, state)}
        arrows={withArrows}
        autoPlay={true}
        autoPlaySpeed={5000}
        className="gd-carousel"
        containerClass="!static"
        dotListClass="indicator_wrp"
        draggable={true}
        infinite={true}
        itemClass={itemClasses}
        removeArrowOnDeviceType={removeArrowOnDeviceType}
        responsive={responsive}
        showDots={withIndicators}
        swipeable={true}
      >
        {elements &&
          elements.map((element, i) => (
            <div className="flex" key={i}>
              {element}
            </div>
          ))}
      </Carousel>
    </div>
  )
}
