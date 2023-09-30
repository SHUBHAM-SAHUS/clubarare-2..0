import React, { useMemo, useState } from 'react'

import { Header } from '../Tabs'

import { ToolBoxProps } from './interface'
import { getTab } from './utils'

import { useSpace } from 'context'

export const ToolBox: React.FC<ToolBoxProps> = ({ showModal, classNames }) => {
  const { selectedTab, setSelectedTab } = useSpace()

  const toolboxClassName = useMemo(
    () => [classNames, 'flex w-full h-full gap-2 px-2 dark:bg-neutral-200'].join(' '),
    [classNames]
  )

  return (
    <div className={toolboxClassName}>
      <div className="flex w-full border-r border-neutral-600 pb-6 pr-2 dark:border-neutral-300">
        {getTab(selectedTab)}
      </div>
      <Header selectedTab={selectedTab} setTab={setSelectedTab} />
    </div>
  )
}
