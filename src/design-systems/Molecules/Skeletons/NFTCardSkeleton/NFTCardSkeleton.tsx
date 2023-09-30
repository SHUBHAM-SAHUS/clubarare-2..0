import { Skeleton } from 'design-systems/Atoms/Skeleton'

export interface NFTCardSkeletonProps {
  className?: string
}

export const NFTCardSkeleton: React.FC<NFTCardSkeletonProps> = ({ className = '' }) => {
  return (
    <div className="space-y-1">
      <div className="h-[156px] w-full md:h-[410px]">
        <Skeleton></Skeleton>
      </div>
      <div className="h-8 w-full md:h-[46px] md:w-[281px] ">
        <Skeleton></Skeleton>
      </div>
      <div className="hidden h-[36px] w-[164px] md:flex">
        <Skeleton></Skeleton>
      </div>
    </div>
  )
}
