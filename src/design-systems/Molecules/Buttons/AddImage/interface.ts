export interface AddImageProps {
  accept?: string[]
  width?: number
  height?: number
  className?: string
  innerWrapperClassName?: string
  onChange?: Function
  defaultImage?: string | Blob | null
  type?: string
  chain?: string
  fullWidth?: boolean
  fullHeight?: boolean
  label?: string
  error?: string
  displayImage?: string | Blob | null
}

export interface FileUploadType {
  fileData: File | any
  type: string
}
