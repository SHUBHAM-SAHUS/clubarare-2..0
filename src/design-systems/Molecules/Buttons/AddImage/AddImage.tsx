import { useState, useEffect, ChangeEvent } from 'react'

import { AddImageProps, FileUploadType } from './interface'
import { MESSAGE, validTypes } from './utils'

import { Typography } from 'design-systems/Atoms/Typography'
import { DeleteIcon, PlusIcon } from 'design-systems/Atoms/Icons'
import { Image } from 'design-systems/Atoms/Image'
import { Video } from 'design-systems/Atoms/Video'
import musicIcon from 'assets/images/musicIcon.png'

export const AddImage = ({
  label = 'Add image',
  width,
  height = 120,
  onChange,
  defaultImage,
  displayImage = null,
  chain,
  type = 'image/png',
  accept = validTypes,
  error = '',
  className,
  innerWrapperClassName,
}: AddImageProps) => {
  const [uploadFile, setUploadFile] = useState<FileUploadType>({ fileData: defaultImage, type: type })
  const [message, setMessage] = useState<string>()
  const [check, setCheck] = useState<number>(1)

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const targetFile = e.target.files[0]
      const fileType = targetFile['type']
      if (accept.includes(fileType)) {
        setUploadFile({ fileData: targetFile, type: fileType })
        setMessage('')
        setCheck(check + 1)
        onChange?.({ fileData: targetFile, type: fileType })
      } else {
        setMessage(MESSAGE.ERROR)
      }
    }
  }

  const handleDeleteImage = () => {
    setUploadFile({ fileData: '', type: '' })
    onChange?.(undefined)
  }

  useEffect(() => {
    setMessage(error)
    if (defaultImage === null) handleDeleteImage()
    if (defaultImage) {
      setMessage('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, defaultImage])

  useEffect(() => {
    if (displayImage) {
      setUploadFile({ fileData: displayImage, type: type })
    }
  }, [displayImage, type])

  return (
    <>
      {!message && uploadFile?.fileData ? (
        <div style={{ width: `${width}px` }}>
          <div className={`flex flex-col justify-center`} style={{ height: `${height}px` }}>
            {uploadFile.type.includes('audio') ? (
              <>
                <Image alt="Music Icon" className="mx-auto" height={80} src={musicIcon} width={80} />
                <audio
                  className="mt-2 h-[30px] w-full"
                  controls
                  src={check === 1 ? uploadFile.fileData : URL.createObjectURL(uploadFile.fileData)}
                />
              </>
            ) : uploadFile.type.includes('video') ? (
              <Video
                className={`h-[${height}px] w-[${width}px]`}
                controls
                height={width}
                src={check === 1 ? uploadFile.fileData : URL.createObjectURL(uploadFile.fileData)}
                width={height}
              />
            ) : (
              <Image
                alt="file-upload"
                className="w-auto object-contain"
                height={height}
                src={check === 1 ? uploadFile.fileData : URL.createObjectURL(uploadFile.fileData)}
                width={width}
              />
            )}
          </div>
          <div className="relative z-20" onClick={handleDeleteImage}>
            {chain !== 'on' && <DeleteIcon className="ml-auto mt-2 cursor-pointer" />}
          </div>
        </div>
      ) : (
        <div className={className} style={{ width: `${width}px ` }}>
          <div
            className={`flex flex-col items-center justify-center rounded-md border-2 border-dashed border-neutral-600 ${innerWrapperClassName}`}
            style={{ height: `${height}px`, width: `${!width ? '100%' : `${width}px`}` }}
          >
            <label className="flex h-full w-full cursor-pointer items-center justify-center">
              <div className="flex flex-col items-center justify-center overflow-hidden text-ellipsis">
                <PlusIcon className="mb-3 h-8 w-8 stroke-neutral-400 dark:stroke-neutral-500" />
                <Typography className="text-center !normal-case" size="caption" variant="condensed">
                  {label}
                </Typography>
              </div>
              <input
                accept={accept ? accept.join(', ') : ''}
                className="hidden"
                name="file"
                type="file"
                onChange={handleFile}
              />
            </label>
          </div>
          <span className="text-xs text-error-800">{message}</span>
        </div>
      )}
    </>
  )
}
