'use client'

import Dropzone from '@/app/_components/dropzone'
import QualitySlider from '@/app/_components/qualitySlider'
import Success from '@/assets/success'
import { convertImage } from '@/utils/imageConverter'
import React, { Suspense, useState, useTransition } from 'react'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [convertedFile, setConvertedFile] = useState<string | undefined>()
  const [originalFileName, setOriginalFileName] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()
  const [quality, setQuality] = useState(0.85)

  const handleFileAccepted = (acceptedFile: File) => {
    setFile(acceptedFile)
    const fileNameWithoutExtension = acceptedFile.name.replace(/\.[^/.]+$/, '')
    setOriginalFileName(fileNameWithoutExtension)
    startTransition(() => convertImage({file:acceptedFile, callback:setConvertedFile, quality, format: 'webp'}))
  }

  const handleQualityChange = (newQuality: number) => {
    setQuality(newQuality)
    if (file) {
      startTransition(() => convertImage({file, callback:setConvertedFile, quality:newQuality, format: 'webp'}))
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-xl">Convert your image</h1>
      <QualitySlider quality={quality} onQualityChange={handleQualityChange} />
      <Dropzone onFileAccepted={handleFileAccepted} />
      {isPending && <p>Converting...</p>}
      <Suspense fallback={<p>Loading converted image...</p>}>
        {convertedFile && originalFileName && (
          <div className="mt-2 flex flex-col items-center">
            <h2 className="mb-2 text-lg">File converted 👇</h2>
            <div className="flex w-80 items-center justify-between rounded-sm bg-white p-3 shadow-sm sm:w-[413px]">
              <div className="flex gap-2">
                <Success color="green" />
                {originalFileName}.webp
              </div>
              <a download={`${originalFileName}.webp`} href={convertedFile}>
                <button className="duration-10 rounded-sm bg-blue-500 px-4 py-1 text-white shadow-md transition delay-0 ease-in-out hover:scale-105 hover:bg-blue-600">
                  Download
                </button>
              </a>
            </div>
          </div>
        )}
      </Suspense>
    </div>
  )
}
