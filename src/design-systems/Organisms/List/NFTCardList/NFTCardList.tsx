import { useMemo } from 'react'

import { NFTCard } from 'design-systems/Molecules/Cards/NFTCard'
import { NFTCardSkeleton } from 'design-systems/Molecules/Skeletons/NFTCardSkeleton'
import { NotFound } from 'design-systems/Molecules/NotFound'
import { getNftPrice, getSaleStatus, shortWalletAddress } from 'utils'

export interface NFTCardListProps {
  isLoading?: boolean
  isFetchingNextAssets?: boolean
  assets: AssetObject[]
  showFilter?: boolean
  className?: string
  onViewAll?: () => void
  refetchAssets?: AnyFunction
}

const NFTCardPlaceholderList: React.FC = () => {
  return (
    <>
      {Array.from(new Array(12)).map((_, index) => (
        <NFTCardSkeleton key={index} />
      ))}
    </>
  )
}

export const NFTCardList: React.FC<NFTCardListProps> = ({
  assets,
  isLoading = false,
  showFilter,
  isFetchingNextAssets = false,
  className: className_ = '',
  onViewAll,
  refetchAssets,
}) => {
  const hasNFTs = Number(assets?.length) > 0
  const className = useMemo(
    () =>
      [
        showFilter
          ? 'grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
          : 'grid w-full grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4',
        className_,
      ].join(' '),
    [showFilter, className_]
  )

  if (!isLoading && !hasNFTs) {
    return <NotFound buttonAction={onViewAll} buttonLabel="View All" />
  }

  return (
    <div className={className}>
      {isLoading ? (
        <NFTCardPlaceholderList />
      ) : (
        assets?.map(asset => (
          <NFTCard
            auctionDetails={asset.auctionDetails}
            editable={false}
            id={asset.id}
            key={asset.id}
            product={{
              collectibleOwner: asset?.collectibleOwner,
              file: {
                alt: asset?.title,
                src: asset?.previewUrl ?? asset?.s3Url,
                type: asset?.fileContentType,
              },
              history: asset.history,
              isHide: asset?.isHide,
              networkId: asset?.networkId,
              onSale: asset?.onSale,
              price: getNftPrice(asset),
              title: asset?.title,
            }}
            refetchAssets={refetchAssets}
            size="large"
            status={getSaleStatus(asset)}
            user={{
              address: asset?.userObj?.walletAddress,
              avatar: asset?.ownerObj?.image ?? asset?.userObj?.image,
              username: asset?.userObj?.name ? asset?.userObj?.name : shortWalletAddress(asset?.userObj?.walletAddress),
              verified: asset?.isApprove,
            }}
          />
        ))
      )}
      {isFetchingNextAssets ? <NFTCardPlaceholderList /> : ''}
    </div>
  )
}
