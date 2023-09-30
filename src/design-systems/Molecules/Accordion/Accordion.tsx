import { useMemo } from 'react'
import ChevronDownIcon from '@heroicons/react/20/solid/ChevronDownIcon'

import { AccordionProps } from './interface'

const classNames = [
  'text-left text-paragraph md:text-subtitle font-RobotoCondensed font-bold uppercase leading-subtitle !text-neutral-500 hover:!text-neutral-100 dark:!text-neutral-500 dark:hover:!text-neutral-700',
].join(' ')

export function Accordion({ content = [], className = '' }: AccordionProps) {
  const mainClassNames = useMemo(() => [className, 'accordion accordion-flush w-full lg:w-508'].join(' '), [className])

  return (
    <div className={mainClassNames} id="accordion-main">
      {content?.map((item, i) => {
        return (
          <div
            className={`accordion-item mb-6 w-full !rounded-bl-none !rounded-br-none border-b border-neutral-700 dark:border-neutral-400`}
            key={i}
          >
            <div className="accordion-header mb-3" id={`accordion-row-${i} ${classNames}`}>
              <button
                aria-controls={`accordion-head-${i}`}
                aria-expanded="false"
                className={`collapsed accordion-button relative flex w-full items-center justify-between transition after:hidden after:!bg-none focus:outline-none ${classNames} cursor-pointer`}
                data-bs-target={`#accordion-head-${i}`}
                data-bs-toggle="collapse"
                type="button"
              >
                <div className="acc_question_wrp flex w-full items-center justify-start">{item.name}</div>
                <div className="flex w-fit items-center justify-end">
                  <ChevronDownIcon aria-hidden="true" className="h-7 w-7" />
                </div>
              </button>
            </div>

            <div
              aria-labelledby={`accordion-row-${i}`}
              className="accordion-collapse collapse"
              data-bs-parent="#accordion-main"
              id={`accordion-head-${i}`}
            >
              <div className="accordion-body mb-3 font-RobotoCondensed text-md font-normal leading-paragraph text-neutral-100 dark:text-neutral-600 md:text-body">
                {item.value}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
