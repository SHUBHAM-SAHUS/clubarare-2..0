import React, { useState } from 'react'
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentArrowDownIcon'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'

import { InfoIcon, PlusIcon } from 'design-systems/Atoms/Icons'
import { Spinner } from 'design-systems/Atoms/Spinner'
import { Typography } from 'design-systems/Atoms/Typography'

export interface FileUploaderProps {
  className?: string
  uploading?: boolean
  error?: string
  value?: string
  label?: string
  acceptedFileTypes?: string | undefined
  allowMultipleFiles?: boolean | undefined
  uploadFileName?: string | undefined
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  className,
  uploading,
  error,
  value,
  label = 'Upload File',
  acceptedFileTypes,
  allowMultipleFiles,
  uploadFileName,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)
  const [isFile, setIsFile] = useState<boolean>(false)
  const [fileName, setFileName] = useState<string>('')
  const isImported = !!value

  const classNames = [className, 'w-full'].join(' ')
  const textClassNames = [
    'flex items-center gap-1',
    error ? 'text-error-800' : 'text-neutral-400 dark:text-neutral-500',
  ].join(' ')

  const dropdownZoneClassName = [
    'rounded-sm',
    !isImported && 'border-2 border-dashed border-neutral-600 dark:border-neutral-400 overflow-hidden',
    !isImported && 'hover:bg-neutral-700 dark:hover:bg-neutral-300',
    !isImported && 'cursor-pointer',
    'h-[200px]',
    'flex flex-col items-center justify-center gap-2',
    'mb-md',
  ].join(' ')

  const handleFileSelect = (e: any) => {
    const files = [...e.target.files]
    if (files) {
      setIsFile(true)
      files.map((ele, i) => {
        setFileName(ele.name)
      })
    }
  }

  const onDeleteFileHandler = (e: any) => {
    setIsFile(false)
    setFileName('')
  }

  if (uploading) {
    return (
      <div className={classNames}>
        <div className={dropdownZoneClassName}>
          <Spinner className="h-8 w-8 stroke-neutral-100 dark:stroke-neutral-800" />
          <Typography className="text-center text-neutral-100 dark:text-neutral-500" size="caption" variant="condensed">
            Uploading...
          </Typography>
        </div>
      </div>
    )
  }

  return (
    <div>
      {!isFile && (
        <label
          className={`flex cursor-pointer flex-col items-center justify-center ${dropdownZoneClassName} ${classNames}`}
          htmlFor="fileSelect"
        >
          <PlusIcon className="h-8 w-8 stroke-neutral-400 dark:stroke-neutral-500" />
          <Typography className="text-center text-neutral-400 dark:text-neutral-500" size="caption" variant="condensed">
            {label}
          </Typography>
          <input
            accept={acceptedFileTypes}
            className="h-full w-full"
            id="fileSelect"
            multiple={allowMultipleFiles}
            name={uploadFileName}
            ref={fileInputRef}
            style={{ display: 'none' }}
            type="file"
            onChange={e => handleFileSelect(e)}
          />
        </label>
      )}

      {isFile && (
        <div className=" flex  items-center justify-between rounded-sm bg-neutral-700 px-3 py-4 shadow-md dark:bg-neutral-200">
          <div className="flex items-center justify-center space-x-1">
            <DocumentDuplicateIcon className="h-8 w-8" />
            <Typography
              className="w-fit truncate break-all text-center text-neutral-100 dark:text-neutral-500"
              size="body"
              variant="condensed"
            >
              {fileName && fileName}
            </Typography>
          </div>
          <TrashIcon className="h-7 w-7 cursor-pointer" onClick={onDeleteFileHandler} />
        </div>
      )}

      {error && (
        <Typography className={textClassNames} size="small" variant="condensed">
          <InfoIcon
            className="h-4 w-4"
            fill={error ? 'fill-error-800' : 'fill-neutral-400 dark:fill-neutral-500'}
            stroke={error ? 'stroke-error-800' : 'stroke-neutral-400 dark:stroke-neutral-500'}
          />
          {error}
        </Typography>
      )}
    </div>
  )
}
