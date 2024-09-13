interface Props {
  imageUrl: string | undefined
  isPending: boolean
  originalFileName?: string
  format?: 'webp' | 'jpeg' | 'png'
}

export default function ImageBox({ imageUrl, isPending}: Props) {
  return (
    <div className="mt-2 flex flex-col items-center">
      {
        !imageUrl ?
          <p className="text-center">No image to show</p>
          :
        isPending ?
          <p className="text-center">Converting...</p>
          : (<>
              <p className="mb-2 text-lg">File converted</p>
              <div className="flex w-80 items-center justify-between rounded-sm bg-white p-3 shadow-sm sm:w-[413px]">
                <div className="flex gap-2">
                  <img src={imageUrl} alt="converted image" className="w-16 h-16 rounded-full"/>
                  {imageUrl?.split('/').pop()}
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
