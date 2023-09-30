import { BackgroundTabIcon, ItemsTabIcon, ElementTabIcon } from 'design-systems/Atoms/Icons'

export const headers = [
  {
    title: 'Background',
    icon: (active: boolean) => (
      <BackgroundTabIcon
        className={`${active ? 'stroke-neutral-100 dark:stroke-neutral-700' : 'stroke-neutral-500'}`}
      />
    ),
  },
  {
    title: 'Items',
    icon: (active: boolean) => (
      <ItemsTabIcon className={`${active ? 'stroke-neutral-100 dark:stroke-neutral-700' : 'stroke-neutral-500'}`} />
    ),
  },
  {
    title: 'Decoration',
    icon: (active: boolean) => (
      <ElementTabIcon className={`${active ? 'stroke-neutral-100 dark:stroke-neutral-700' : 'stroke-neutral-500'}`} />
    ),
  },
  // TODO: add after MVP
  // {
  //   title: 'Border',
  //   icon: (active: boolean) => (
  //     <BorderTabIcon className={`${active ? 'stroke-neutral-100 dark:stroke-neutral-700' : 'stroke-neutral-500'}`} />
  //   ),
  // },
]
