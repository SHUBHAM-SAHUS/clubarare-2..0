export const Skeleton: React.FC = () => {
  return (
    <div
      className="flex h-full w-full animate-pulse items-center justify-center rounded bg-neutral-600 dark:bg-neutral-300"
      role="status"
    />
  )
}
