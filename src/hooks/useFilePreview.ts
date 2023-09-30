import { useEffect, useState } from 'react'

export function useFilePreview(files: File[], image = '') {
  const [imgSrc, setImgSrc] = useState<string>(image)

  useEffect(() => {
    if (files && files[0] && typeof files !== 'string') {
      const newUrl: string = URL.createObjectURL(files[0])

      if (newUrl && newUrl !== imgSrc) {
        setImgSrc(newUrl)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files])

  return [imgSrc, setImgSrc]
}
