import { TabsProps } from './interface'
import { Tab } from './Tab'

export function Tabs({ tabs, currentTab, onChangeTab }: TabsProps) {
  return (
    <div className="flex gap-2 font-RobotoCondensed md:gap-6">
      {tabs?.map((tab, index) => (
        <Tab active={index === currentTab} key={tab} label={tab} onClick={() => onChangeTab?.(index)} />
      ))}
    </div>
  )
}
