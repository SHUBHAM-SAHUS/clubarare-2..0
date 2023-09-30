import { useCallback, useEffect, useState } from 'react'

import { compareStringsInsentively } from 'utils'

export interface CategoryListProps {
  categories: CategoryObject[]
  initialSelectedCategory?: string
  onClick?: (categoryId: string) => void
  className?: string
}

/**
 * @deprecated Try use BadgeList component
 * Try use BadgeList component
 */
export const CategoryList: React.FC<CategoryListProps> = ({
  className,
  categories,
  initialSelectedCategory,
  onClick,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleSelectCategory = useCallback(
    (categoryId: string) => () => {
      if (compareStringsInsentively(String(selectedCategory), categoryId)) {
        setSelectedCategory('')
        onClick?.('')
      } else {
        setSelectedCategory(categoryId)
        onClick?.(categoryId)
      }
    },
    [selectedCategory, onClick]
  )
  useEffect(() => {
    if (initialSelectedCategory) {
      setSelectedCategory(initialSelectedCategory)
    } else {
      setSelectedCategory('')
    }
  }, [initialSelectedCategory])
  const getButtonStyle = (name: string) => {
    const categoryClassName =
      'border border-neutral-500 text-neutral-500 py-1 px-3 typography-caption rounded-2xl cursor-pointer disabled:border-neutral-800 disabled:text-neutral-800 ' +
      className
    if (compareStringsInsentively(String(selectedCategory), name)) {
      return ` ${categoryClassName} !bg-neutral-100 !text-neutral-600 dark:!bg-neutral-700 dark:!text-neutral-100`
    }
    return categoryClassName
  }

  return (
    <div className="flex w-full flex-wrap items-center gap-2">
      {categories?.map(category => (
        <button
          key={category.id}
          type="button"
          className={getButtonStyle(category.name)}
          // disabled={compareStringsInsentively(String(selectedCategory), category.name)}
          onClick={handleSelectCategory(category.name.toLowerCase())}
        >
          {category.name}
        </button>
      ))}
    </div>
  )
}
