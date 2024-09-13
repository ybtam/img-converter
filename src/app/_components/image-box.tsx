import {useEffect, useState, useTransition} from "react";
import {convertImage} from "@/utils/imageConverter";

interface Props {
  format: 'webp' | 'jpeg' | 'png'
  file: File | null
  quality: number
}

export default function ImageBox({ file, quality, format }: Props) {
  const [imageUrl, setImageUrl] = useState<string>()

  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (!file) return

    startTransition(() => convertImage({file, callback:setImageUrl, quality, format}))
  }, [quality, file]);

  return (
    <div className="mt-2 flex flex-col items-center">
      {
        isPending ?
          <p className="text-center">Converting...</p>
          : ( !imageUrl ?
            <p className="text-center">{format}</p>
            :<>
              <p className="mb-2 text-lg">File converted</p>
              <div className="flex w-80 items-center justify-between rounded-sm bg-white p-3 shadow-sm sm:w-[413px]">
                <div className="flex gap-2">
                  <img src={imageUrl} alt="converted image" className="w-16 h-16"/>
                  {imageUrl?.split('/').pop()} ({format})
                </div>
                <a download={imageUrl?.split('/').pop()} href={imageUrl}>
                  <button
                    className="duration-10 rounded-sm bg-blue-500 px-4 py-1 text-white shadow-md transition delay-0 ease-in-out hover:scale-105 hover:bg-blue-600">
                    Download
                  </button>
                </a>
              </div>
            </>)
      }
    </div>
  )
}
