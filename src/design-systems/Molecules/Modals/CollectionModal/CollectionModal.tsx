import { useMemo, useState, useCallback } from 'react'

import { CollectionModalProps } from './interface'

import { Button } from 'design-systems/Atoms/Button'
import { Typography } from 'design-systems/Atoms/Typography'
import { File } from 'design-systems/Molecules/File'
import { Checkbox } from 'design-systems/Atoms/Checkbox'
import { useToggle } from 'hooks/useToggle'

export const CollectionModel: React.FC<CollectionModalProps> = ({
  collectionId,
  height = 80,
  width = 80,
  NFTDetails,
  onClose,
  changeNFT,
}) => {
  const initialSelectedAssetIds = useMemo(() => {
    return NFTDetails?.filter(tes => tes?.isAdded === true).map(user => user.id)
  }, [NFTDetails])

  const [selectedAssetIds, setSelectedAssetIds] = useState<Array<string>>(initialSelectedAssetIds || [])
  const [lock, toggleLock] = useToggle(false)

  const handleSelectAsset = useCallback(
    (assetId: string) => () => {
      if (selectedAssetIds.includes(assetId)) {
        setSelectedAssetIds(selectedAssetIds.filter(data => data !== assetId))
        selectedAssetIds.slice(Number(assetId))
      } else {
        setSelectedAssetIds(pre => [...pre, assetId])
      }
    },
    [selectedAssetIds]
  )

  const handleSave = useCallback(async () => {
    toggleLock()
    await changeNFT({ id: collectionId, nfts: selectedAssetIds })
    toggleLock()

    onClose?.()
  }, [changeNFT, collectionId, selectedAssetIds, onClose, toggleLock])

  return (
    <>
      <div className=" mx-auto rounded-3xl bg-neutral-800 p-4 pt-0 dark:bg-neutral-200 md:w-[512px]">
        <Typography className="lowercase text-neutral-400  dark:text-neutral-800" size="caption">
          You can freely add or remove NFTs to this collection.
        </Typography>
        <div className="max-h-[300px] overflow-auto">
          {NFTDetails?.map((data, i) => (
            <div className="flex justify-between  py-2 dark:text-neutral-800" key={i}>
              <div className="t-sm flex items-center justify-start gap-x-2 ">
                <File
                  alt={data?.title ?? 'clubrare-asset-file'}
                  height={height}
                  src={data?.previewUrl}
                  type={data?.fileContentType}
                  width={width}
                />
                <Typography className="font-medium text-neutral-100 dark:text-neutral-800" size="caption">
                  {data.title}
                </Typography>
              </div>
              <Checkbox checked={data?.isAdded} onChange={handleSelectAsset(data?.id)} />
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-between py-2 uppercase">
          <Button className="uppercase sm:hidden md:block" color="primary" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="!bg-neutral-100 uppercase text-neutral-800 sm:w-full md:w-1/3"
            color="primary"
            disabled={lock}
            loading={lock}
            variant="outlined"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </div>
      <div className="offcanvas-backdrop show fade -z-50 h-full w-full" style={{ width: '100%', height: '100%' }}></div>
    </>
  )
}
