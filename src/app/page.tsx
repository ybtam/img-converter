'use client'

import Dropzone from '@/app/_components/dropzone'
import QualitySlider from '@/app/_components/qualitySlider'
import Success from '@/assets/success'
import { convertImage } from '@/utils/imageConverter'
import React, { Suspense, useState, useTransition } from 'react'
import ImageBox from "@/app/_components/image-box";

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [convertedFile, setConvertedFile] = useState<string>()
  const [isPending, startTransition] = useTransition()
  const [quality, setQuality] = useState(0.85)

  const handleFileAccepted = (acceptedFile: File) => {
    setFile(acceptedFile)
    const fileNameWithoutExtension = acceptedFile.name.replace(/\.[^/.]+$/, '')
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
      <ImageBox imageUrl={convertedFile} isPending={isPending} />
    </div>
  )
}
